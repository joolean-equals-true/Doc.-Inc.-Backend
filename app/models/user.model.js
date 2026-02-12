import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const User = SequelizeInstance.define("users", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
   last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  ssn: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  is_active:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  account_number:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  }
});

export default User;

