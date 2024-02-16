const Sequelize = require("sequelize");
const db = require("../database");

const Assignment = db.define("assignment", {
  title: {
    type: Sequelize.STRING,
    //unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    //unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  text: {
    type: Sequelize.TEXT,
    //unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Assignment;
