import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Document from "./document.model.js";
import Email from "./email.model.js";
import Recipient from "./recipient.model.js";
import Logging from "./logging.model.js";
import Business_Account from "./business_account.model.js";
import Client_Membership from "./client_membership.model.js";
import Account_Link from "./account_link.model.js";
import Business_Division from "./business_division.model.js";
import Business from "./business.model.js";



const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.account_link = Account_Link;
db.business = Business;
db.business_division = Business_Division;
db.business_account = Business_Account;
db.client_membership = Client_Membership;
db.document = Document;
db.email = Email;
db.recipient = Recipient;
db.logging = Logging;

//foreign key associations defined here:
db.user.hasMany(db.account_link, { foreignKey: "original_account_id" });
db.account_link.belongsTo(db.user, { foreignKey: "original_account_id" });

db.user.hasMany(db.account_link, { foreignKey: "linked_account_id" });
db.account_link.belongsTo(db.user, { foreignKey: "linked_account_id" });

db.business.hasMany(db.business_division, { foreignKey: "business_id" });
db.business_division.belongsTo(db.business, { foreignKey: "business_id" });

db.business_division.hasMany(db.business_account, { foreignKey: "business_division_id" });
db.business_account.belongsTo(db.business_division, { foreignKey: "business_division_id" });

db.user.hasOne(db.business_account, { foreignKey: "user_id" });
db.business_account.belongsTo(db.user, { foreignKey: "user_id" });

db.business.hasMany(db.client_membership, { foreignKey: "business_id" });
db.client_membership.belongsTo(db.business, { foreignKey: "business_id" });

db.user.hasMany(db.client_membership, { foreignKey: "client_id" });
db.client_membership.belongsTo(db.user, { foreignKey: "client_id" });

db.user.hasMany(db.document, { foreignKey: "receiver_id" });
db.document.belongsTo(db.user, { foreignKey: "receiver_id" });

db.document.hasOne(db.email, { foreignKey: "document_id" });
db.email.belongsTo(db.business, { foreignKey: "business_id" });
db.business.hasMany(db.email, { foreignKey: "business_id" });

db.recipient.belongsTo(db.user, { foreignKey: "receiver_id" });
db.recipient.hasMany(db.recipient, { foreignKey: "email_id" });

db.logging.hasOne(db.recipient, { foreignKey: "recipient_id" });
db.email.hasOne(db.logging, { foreignKey: "email_id" });




export default db;
