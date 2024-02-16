// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./database");

//Import models here
const Account = require("./models/Account");
const Class = require("./models/Class");
const Announcement = require("./models/Announcement");
const Module = require("./models/Module");
const Assignment = require("./models/Assignment");
const Student = require("./models/Student");
//associations
//Accounts
Account.belongsToMany(Class, { through: Student });
Class.belongsToMany(Account, { through: Student });

Class.hasMany(Announcement);
Announcement.belongsTo(Class);

Class.hasMany(Module);
Module.belongsTo(Class);

Module.hasMany(Assignment);
Assignment.belongsTo(Module);

module.exports = {
  db,
  Account,
  Class,
  Announcement,
  Module,
  Assignment,
  Student,
};
