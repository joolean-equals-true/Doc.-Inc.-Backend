import db  from "../models/index.js";
import logger from "../config/logger.js";

const Document = db.document;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Document
exports.create = (req, res) => {
  // Validate request

  // Create a Document
  const document = {
    document_name: req.body.document_name,
    account_number: req.body.account_number,
    SSN: req.body.SSN,
    document_content: req.body.document_content,
    receiver_id: req.body.receiver_id,
    sender_id: req.body.sender_id
  };

  logger.debug(`Creating Document...`);

  // Save Document in the database
  Document.create(document)
    .then((data) => {
      logger.info(`Document created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Document: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Document.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all Documents with condition: ${JSON.stringify(condition)}`);

  Document.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Documents`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Documents: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Document with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding Document with id: ${id}`);

  Document.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Document found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Document not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Document with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Document ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Document with id=" + id,
      });
    });
};

// Find a single Document with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding Document with email: ${email}`);

  Document.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`Document found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`Document not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find Document with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Document by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Document with email=" + email,
      });
    });
};

// Update a Document by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  logger.debug(`Updating Document ${id} with data: ${JSON.stringify(req.body)}`);

  Document.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Document ${id} updated successfully`);
        res.send({
          message: "Document was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Document ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Document ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Document with id=" + id,
      });
    });
};

// Delete a Document with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete Document: ${id}`);

  Document.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Document ${id} deleted successfully`);
        res.send({
          message: "Document was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Document ${id} - not found`);
        res.send({
          message: `Cannot delete Document with id=${id}. Maybe Document was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Document ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Document with id=" + id,
      });
    });
};


export default exports;
