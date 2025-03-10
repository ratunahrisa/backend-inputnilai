const {DataTypes} = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    const attributes = {
      id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "id",
      },
      name: {
        type: DataTypes.STRING(),
        field: "name",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "email",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "password",
      },
      role: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
        field: "role",
      },
      created_at: {
        type: DataTypes.DATE(),
        allowNull: false,
        comment: null,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updated_at: {
        type: DataTypes.DATE(),
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    };
  
    const options = {
      tableName: "users",
      comment: "",
      indexes: [],
      timestamps: false,
    };
  
    return sequelize.define("users", attributes, options);
  };