import db  from "../models/index.js";
import logger from "../config/logger.js";

const Business_Account = db.business_account;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Business_Account
exports.create = (req, res) => {
  // Validate request

  // Create a Business_Account
  const business_account = {
    user_id: req.body.user_id,
    business_division_id: req.body.business_division_id,
    is_admin: req.body.is_admin
  };

  logger.debug(`Creating Business_Account...`);

  // Save Business_Account in the database
  Business_Account.create(business_account)
    .then((data) => {
      logger.info(`Business_Account created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Business_Account: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Business_Account.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all Business_Accounts with condition: ${JSON.stringify(condition)}`);

  Business_Account.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Business_Accounts`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Business_Accounts: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Business_Account with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding Business_Account with id: ${id}`);

  Business_Account.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Business_Account found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Business_Account not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Business_Account with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Business_Account ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Business_Account with id=" + id,
      });
    });
};

// Find a single Business_Account with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding Business_Account with email: ${email}`);

  Business_Account.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`Business_Account found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`Business_Account not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Business_Account with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Business_Account by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Business_Account with email=" + email,
      });
    });
};

// Update a Business_Account by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  logger.debug(`Updating Business_Account ${id} with data: ${JSON.stringify(req.body)}`);

  Business_Account.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Business_Account ${id} updated successfully`);
        res.send({
          message: "Business_Account was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Business_Account ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Business_Account with id=${id}. Maybe Business_Account was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Business_Account ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Business_Account with id=" + id,
      });
    });
};

// Delete a Business_Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete Business_Account: ${id}`);

  Business_Account.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Business_Account ${id} deleted successfully`);
        res.send({
          message: "Business_Account was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Business_Account ${id} - not found`);
        res.send({
          message: `Cannot delete Business_Account with id=${id}. Maybe Business_Account was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Business_Account ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Business_Account with id=" + id,
      });
    });
};


export default exports;
