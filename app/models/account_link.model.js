import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Account_Link = SequelizeInstance.define("account_links", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  original_account_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "users",
        key: "id"
    }
  },
   linked_account_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "users",
        key: "id"
    }
  }
});

export default Account_Link;

