import db  from "../models/index.js";
import logger from "../config/logger.js";

const Client_Membership = db.client_membership;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Client_Membership
exports.create = (req, res) => {
  // Validate request

  // Create a Client_Membership
  const client_membership = {
    business_id: req.body.business_id,
    client_id: req.body.client_id,
    opt_out: req.body.opt_out
  };

  logger.debug(`Creating Client_Membership...`);

  // Save Client_Membership in the database
  Client_Membership.create(client_membership)
    .then((data) => {
      logger.info(`Client_Membership created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Client_Membership: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Client_Membership.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all Client_Memberships with condition: ${JSON.stringify(condition)}`);

  Client_Membership.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Client_Memberships`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Client_Memberships: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Client_Membership with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding Client_Membership with id: ${id}`);

  Client_Membership.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Client_Membership found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Client_Membership not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Client_Membership with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Client_Membership ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Client_Membership with id=" + id,
      });
    });
};

// Find a single Client_Membership with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding Client_Membership with email: ${email}`);

  Client_Membership.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`Client_Membership found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`Client_Membership not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Client_Membership with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Client_Membership by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Client_Membership with email=" + email,
      });
    });
};

// Update a Client_Membership by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  logger.debug(`Updating Client_Membership ${id} with data: ${JSON.stringify(req.body)}`);

  Client_Membership.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Client_Membership ${id} updated successfully`);
        res.send({
          message: "Client_Membership was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Client_Membership ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Client_Membership with id=${id}. Maybe Client_Membership was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Client_Membership ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Client_Membership with id=" + id,
      });
    });
};

// Delete a Client_Membership with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete Client_Membership: ${id}`);

  Client_Membership.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Client_Membership ${id} deleted successfully`);
        res.send({
          message: "Client_Membership was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Client_Membership ${id} - not found`);
        res.send({
          message: `Cannot delete Client_Membership with id=${id}. Maybe Client_Membership was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Client_Membership ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Client_Membership with id=" + id,
      });
    });
};


export default exports;
