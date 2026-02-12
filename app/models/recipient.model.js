import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Recipient = SequelizeInstance.define("recipients", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  receiver_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "users",
        key: "id"
    }
  },
  email_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "emails",
        key: "id"
    }
  }
});

export default Recipient;

