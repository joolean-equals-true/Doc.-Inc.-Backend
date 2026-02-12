import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Logging = SequelizeInstance.define("loggings", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  time_sent:{
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  time_received:{
    type: Sequelize.DATE,
    allowNull: true, 
    defaultValue: null,
  },
  has_opened:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  recipient_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  email_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  }
});

export default Logging;

