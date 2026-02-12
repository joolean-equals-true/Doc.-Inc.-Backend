import db  from "../models/index.js";
import logger from "../config/logger.js";

const Recipient = db.recipient;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Recipient
exports.create = (req, res) => {
  // Validate request

  // Create a Recipient
  const recipient = {
    receiver_id: req.body.receiver_id,
    email_id: req.body.email_id
  };

  logger.debug(`Creating Recipient...`);

  // Save Recipient in the database
  Recipient.create(recipient)
    .then((data) => {
      logger.info(`Recipient created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Recipient: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Recipient.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all Recipients with condition: ${JSON.stringify(condition)}`);

  Recipient.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Recipients`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Recipients: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Recipient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding Recipient with id: ${id}`);

  Recipient.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Recipient found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Recipient not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Recipient with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Recipient ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Recipient with id=" + id,
      });
    });
};

// Find a single Recipient with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding Recipient with email: ${email}`);

  Recipient.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`Recipient found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`Recipient not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Recipient with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Recipient by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Recipient with email=" + email,
      });
    });
};

// Update a Recipient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  logger.debug(`Updating Recipient ${id} with data: ${JSON.stringify(req.body)}`);

  Recipient.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Recipient ${id} updated successfully`);
        res.send({
          message: "Recipient was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Recipient ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Recipient with id=${id}. Maybe Recipient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Recipient ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Recipient with id=" + id,
      });
    });
};

// Delete a Recipient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete Recipient: ${id}`);

  Recipient.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Recipient ${id} deleted successfully`);
        res.send({
          message: "Recipient was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Recipient ${id} - not found`);
        res.send({
          message: `Cannot delete Recipient with id=${id}. Maybe Recipient was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Recipient ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Recipient with id=" + id,
      });
    });
};


export default exports;
