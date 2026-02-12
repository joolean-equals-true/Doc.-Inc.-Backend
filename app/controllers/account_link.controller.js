import db  from "../models/index.js";
import logger from "../config/logger.js";

const Account_Link = db.account_link;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Account_Link
exports.create = (req, res) => {

  const account_link = {
    original_account_id: req.body.original_account_id,
    linked_account_id: req.body.linked_account_id,
  };
  
  logger.debug(`Creating Account_Link...`);
  
  // Save Account_Link in the database
  Account_Link.create(account_link)
    .then((data) => {
      logger.info(`Account_Link created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Account_Link: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account_Link.",
      });
    });
};
// Retrieve all Account_Links from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all Account_Links with condition: ${JSON.stringify(condition)}`);
  
  Account_Link.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Account_Links`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Account_Links: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Account_Links.",
      });
    });
};

// Find a single Account_Link with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Account_Link.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Account_Links for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Account_Links for user with id=" + userId,
      });
    });
};
// Find a single Account_Link with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Account_Link with id: ${id}`);
  
  Account_Link.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Account_Link found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Account_Link not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Account_Link with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Account_Link ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Account_Link with id=" + id,
      });
    });
};
// Update a Account_Link by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Account_Link.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Account_Link was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Account_Link with id=${id}. Maybe Account_Link was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Account_Link with id=" + id,
      });
    });
};
// Delete a Account_Link with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Account_Link: ${id}`);
  
  Account_Link.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Account_Link ${id} deleted successfully`);
        res.send({
          message: "Account_Link was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Account_Link ${id} - not found`);
        res.send({
          message: `Cannot delete Account_Link with id=${id}. Maybe Account_Link was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Account_Link ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Account_Link with id=" + id,
      });
    });
};

export default exports;