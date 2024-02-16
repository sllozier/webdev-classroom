const Sequelize = require("sequelize");
const db = require("../database");

const Announcement = db.define("announcement", {
  text: {
    type: Sequelize.TEXT,
    //unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isPinned: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  isEdited: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
});

module.exports = Announcement;
