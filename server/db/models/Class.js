const Sequelize = require("sequelize");
const db = require("../database");
const Account = require("../models/Account");

const Class = db.define("class", {
  name: {
    type: Sequelize.STRING,
    //unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  subject: {
    type: Sequelize.STRING,
    //unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  size: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

// Class.afterCreate(async (singleClass) => {
//   if (singleClass.id === 2) {
//     await singleClass.addAccount(1, {
//       through: { quantity: 1, classSize: singleClass.size },
//     });
//     const account1 = await Account.findByPk(1);
//     await account1.increment(
//       { size: singleClass.size },
//       {
//         where: {
//           id: 1,
//         },
//       }
//     );
//     await singleClass.addAccount(2, {
//       through: { quantity: 1, classSize: singleClass.size },
//     });
//     const account2 = await Account.findByPk(2);
//     await account2.increment(
//       { size: singleClass.size },
//       {
//         where: {
//           id: 2,
//         },
//       }
//     );
//   }
//   if (singleClass.id === 3) {
//     awaitsingleClass.addAccount(1, {
//       through: { quantity: 1, classSize: singleClass.size },
//     });
//     const account1 = await Account.findByPk(1);
//     await account1.increment(
//       { size: singleClass.size },
//       {
//         where: {
//           id: 1,
//         },
//       }
//     );
//   }
//   if (singleClass.id === 4) {
//     await singleClass.addAccount(1, {
//       through: { quantity: 1, classSize: singleClass.size },
//     });
//     const account1 = await Account.findByPk(1);
//     await account1.increment(
//       { size: singleClass.size },
//       {
//         where: {
//           id: 1,
//         },
//       }
//     );
//   }
// });

module.exports = Class;
