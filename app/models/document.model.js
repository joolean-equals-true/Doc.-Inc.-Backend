import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Document = SequelizeInstance.define("documents", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  document_name:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  document_content:{
    //I didn't know a text datatype existed here, so this is quite 
    //interesting. made for large text data.
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  size:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  ssn: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  account_number:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  receiver_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "users",
        key: "id"
    }
  }
});

export default Document;

