import db  from "../models/index.js";
import logger from "../config/logger.js";

const Logging = db.logging;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Logging
exports.create = (req, res) => {
  // Validate request

  // Create a Logging
  const logging = {
    time_sent: req.body.time_sent,
    time_received: req.body.time_received,
    has_opened: req.body.has_opened,
    recipient_id: req.body.recipient_id,
    email_id: req.body.email_id
  };

  logger.debug(`Creating Logging...`);

  // Save Logging in the database
  Logging.create(logging)
    .then((data) => {
      logger.info(`Logging created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Logging: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Logging.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all Loggings with condition: ${JSON.stringify(condition)}`);

  Logging.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Loggings`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Loggings: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Logging with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding Logging with id: ${id}`);

  Logging.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Logging found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Logging not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Logging with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Logging ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Logging with id=" + id,
      });
    });
};

// Find a single Logging with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding Logging with email: ${email}`);

  Logging.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`Logging found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`Logging not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Logging with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Logging by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Logging with email=" + email,
      });
    });
};

// Update a Logging by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  logger.debug(`Updating Logging ${id} with data: ${JSON.stringify(req.body)}`);

  Logging.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Logging ${id} updated successfully`);
        res.send({
          message: "Logging was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Logging ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Logging with id=${id}. Maybe Logging was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Logging ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Logging with id=" + id,
      });
    });
};

// Delete a Logging with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete Logging: ${id}`);

  Logging.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Logging ${id} deleted successfully`);
        res.send({
          message: "Logging was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Logging ${id} - not found`);
        res.send({
          message: `Cannot delete Logging with id=${id}. Maybe Logging was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Logging ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Logging with id=" + id,
      });
    });
};


export default exports;
