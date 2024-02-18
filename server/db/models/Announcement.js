const Sequelize = require("sequelize");
const db = require("../database");

const Announcement = db.define("announcement", {
  authorId: {
    type: Sequelize.INTEGER,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATEONLY,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  creatorName: {
    type: Sequelize.STRING,
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
