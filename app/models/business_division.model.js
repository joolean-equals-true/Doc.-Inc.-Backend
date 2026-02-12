import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Business_Division = SequelizeInstance.define("business_divisions", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  business_id:{
    type: Sequelize.INTEGER,
    allowNull: null,
    defaultValue: null,
    references:{
        model: "businesses",
        key: "id"
  }
},
    name:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
    }
});

export default Business_Division;

