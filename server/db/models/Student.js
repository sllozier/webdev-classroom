const Sequelize = require("sequelize");
const db = require("../database");
const Account = require("./Account");
const Class = require("./Class");

const Student = db.define("student", {
  classId: {
    type: Sequelize.INTEGER,
    references: {
      model: Class,
      key: "id",
    },
  },
  accountId: {
    type: Sequelize.INTEGER,
    references: {
      model: Account,
      key: "id",
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  classSize: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = Student;
