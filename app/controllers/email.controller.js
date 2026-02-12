import db  from "../models/index.js";
import logger from "../config/logger.js";

const Email = db.email;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Email
exports.create = (req, res) => {
  // Validate request

  // Create a Email
  const email = {
    name: req.body.name,
    expiration_date: req.body.expiration_date,
    is_visible: req.body.is_visible,
    document_id: req.body.document_id,
    business_id: req.body.business_id
  };

  logger.debug(`Creating Email...`);

  // Save Email in the database
  Email.create(email)
    .then((data) => {
      logger.info(`Email created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Email: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Email.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all Emails with condition: ${JSON.stringify(condition)}`);

  Email.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Emails`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Emails: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Email with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding Email with id: ${id}`);

  Email.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Email found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Email not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Email with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Email ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Email with id=" + id,
      });
    });
};

// Find a single Email with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding Email with email: ${email}`);

  Email.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`Email found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`Email not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Email with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Email by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Email with email=" + email,
      });
    });
};

// Update a Email by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  logger.debug(`Updating Email ${id} with data: ${JSON.stringify(req.body)}`);

  Email.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Email ${id} updated successfully`);
        res.send({
          message: "Email was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Email ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Email with id=${id}. Maybe Email was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Email ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Email with id=" + id,
      });
    });
};

// Delete a Email with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete Email: ${id}`);

  Email.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Email ${id} deleted successfully`);
        res.send({
          message: "Email was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Email ${id} - not found`);
        res.send({
          message: `Cannot delete Email with id=${id}. Maybe Email was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Email ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Email with id=" + id,
      });
    });
};


export default exports;
