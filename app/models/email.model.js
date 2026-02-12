import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Email = SequelizeInstance.define("emails", {
  
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
  expiration_date:{
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null,
  },
  is_visible:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  document_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "documents",
        key: "id"
  }
},
business_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "businesses",
        key: "id"
    }
}
});

export default Email;

