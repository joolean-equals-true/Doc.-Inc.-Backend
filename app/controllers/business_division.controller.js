import db  from "../models/index.js";
import logger from "../config/logger.js";

const Business_Division = db.business_division;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Business_Division
exports.create = (req, res) => {
  // Validate request

  // Create a Business_Division
  const business_divsion = {
    business_id: req.body.business_id,
    name: req.body.name
  };

  logger.debug(`Creating Business_Division...`);

  // Save Business_Division in the database
  Business_Division.create(business_divsion)
    .then((data) => {
      logger.info(`Business_Division created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Business_Division: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Business_Division.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all Business_Divisions with condition: ${JSON.stringify(condition)}`);

  Business_Division.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Business_Divisions`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Business_Divisions: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Business_Division with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding Business_Division with id: ${id}`);

  Business_Division.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Business_Division found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Business_Division not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Business_Division with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Business_Division ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Business_Division with id=" + id,
      });
    });
};

// Find a single Business_Division with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding Business_Division with email: ${email}`);

  Business_Division.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`Business_Division found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`Business_Division not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Business_Division with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Business_Division by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Business_Division with email=" + email,
      });
    });
};

// Update a Business_Division by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  logger.debug(`Updating Business_Division ${id} with data: ${JSON.stringify(req.body)}`);

  Business_Division.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Business_Division ${id} updated successfully`);
        res.send({
          message: "Business_Division was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Business_Division ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Business_Division with id=${id}. Maybe Business_Division was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Business_Division ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Business_Division with id=" + id,
      });
    });
};

// Delete a Business_Division with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete Business_Division: ${id}`);

  Business_Division.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Business_Division ${id} deleted successfully`);
        res.send({
          message: "Business_Division was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Business_Division ${id} - not found`);
        res.send({
          message: `Cannot delete Business_Division with id=${id}. Maybe Business_Division was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Business_Division ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Business_Division with id=" + id,
      });
    });
};


export default exports;
