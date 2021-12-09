const { DataTypes } = require("sequelize");
const database = require("../../database");

const User = database.define(
  "user",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
