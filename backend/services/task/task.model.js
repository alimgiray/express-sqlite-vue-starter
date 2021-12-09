const { DataTypes } = require("sequelize");
const database = require("../../database");

const User = require("../user/user.model");

const Task = database.define(
  "task",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;
