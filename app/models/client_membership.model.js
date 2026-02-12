import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Client_Membership = SequelizeInstance.define("client_memberships", {
  
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
    business_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "businesses",
        key: "id"
    }
    },

    client_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "users",
        key: "id"
    }
    },  

    opt_out:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    }
});

export default Client_Membership;

