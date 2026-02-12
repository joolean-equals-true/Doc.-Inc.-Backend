import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Business_Account = SequelizeInstance.define("business_accounts", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "users",
        key: "id"
    }
  },
  business_division_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
        model: "business_divisions",
        key: "id"
  }
},
    is_admin:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    }
});

export default Business_Account;
