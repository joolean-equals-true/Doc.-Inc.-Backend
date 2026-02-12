import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Business = SequelizeInstance.define("businesses", {
  
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
    },
    domain:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
    }
});

export default Business;

