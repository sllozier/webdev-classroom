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
});

module.exports = Module;
