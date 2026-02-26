import db  from "../models/index.js";
import logger from "../config/logger.js";

const Business = db.business;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Business
exports.create = (req, res) => {
  // Validate request

  // Create a Business
  const business = {
    name: req.body.name,
    domain: req.body.domain
  };

  logger.debug(`Creating Business...`);

  // Save Business in the database
  Business.create(business)
    .then((data) => {
      logger.info(`Business created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Business: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Business.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all Businesss with condition: ${JSON.stringify(condition)}`);

  Business.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Businesss`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Businesss: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Business with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding Business with id: ${id}`);

  Business.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Business found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Business not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Business with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Business ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Business with id=" + id,
      });
    });
};

// Find a single Business with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding Business with email: ${email}`);

  Business.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`Business found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`Business not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Business with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Business by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Business with email=" + email,
      });
    });
};

// Update a Business by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    logger.debug(`Updating user ${id} with data: ${JSON.stringify(req.body)}`);

    const user = await User.findByPk(id);

    if (!user) {
      logger.warn(`User not found with id: ${id}`);
      return res.status(404).send({
        message: `Cannot find User with id=${id}.`,
      });
    }

    // Check if opt_out is being changed to true
    if (
      req.body.opt_out === true &&
      user.opt_out === false
    ) {
      user.balance += 2;
      logger.info(`User ${id} opted out — balance increased by 2`);
    }

    // Update other fields
    await user.update(req.body);

    logger.info(`User ${id} updated successfully`);
    res.send({
      message: "User was updated successfully.",
    });

  } catch (err) {
    logger.error(`Error updating user ${id}: ${err.message}`);
    res.status(500).send({
      message: "Error updating User with id=" + id,
    });
  }
};

// Delete a Business with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete Business: ${id}`);

  Business.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Business ${id} deleted successfully`);
        res.send({
          message: "Business was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Business ${id} - not found`);
        res.send({
          message: `Cannot delete Business with id=${id}. Maybe Business was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Business ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Business with id=" + id,
      });
    });
};


export default exports;
