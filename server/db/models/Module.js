const Sequelize = require("sequelize");
const db = require("../database");

const Module = db.define("module", {
  name: {
    type: Sequelize.STRING,
    //unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Module;
