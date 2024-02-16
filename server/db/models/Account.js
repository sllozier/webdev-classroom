const Sequelize = require("sequelize");
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT = process.env.TOKEN;
const Class = require("./Class");

const SALT_ROUNDS = 5;

const Account = db.define("account", {
  fName: {
    type: Sequelize.STRING,
    //unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lName: {
    type: Sequelize.STRING,
    // unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userName: {
    type: Sequelize.STRING,
    //unique: true,
    allowNull: false,
    // validate: {
    //   len: [4, 32],
    //   isAlphanumeric: true,
    // },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //     len: [8, 32],
    // }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  googleId: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

Account.prototype.comparePassword = function (pswd) {
  return bcrypt.compare(pswd, this.password);
};

Account.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

Account.byToken = async function (token) {
  try {
    // console.log('MODEL TOKEN', token)
    const { id } = await jwt.verify(token, JWT);
    //console.log('MODEL ID', id)
    const account = Account.findByPk(id);
    if (!account) {
      throw "nooo";
    }
    return account;
  } catch {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

Account.authenticate = async function ({ username, password }) {
  const account = await Account.findOne({
    where: {
      userName: username,
    },
  });
  if (!account || !(await account.comparePassword(password))) {
    const error = Error("Incorrect username or password");
    error.status = 401;
    throw error;
  }
  return account.generateToken();
};

const hashPassword = async function (account) {
  if (account.changed("password")) {
    account.password = await bcrypt.hash(account.password, SALT_ROUNDS);
  }
};

Account.beforeCreate(hashPassword);
Account.beforeUpdate(hashPassword);
Account.beforeBulkCreate((accounts) => Promise.all(account.map(hashPassword)));

Account.afterCreate(async (account) => {
  if (account.id === 2) {
    await account.addClass(1, {
      through: { quantity: 1, classSize: account.count },
    });
    const class1 = await Class.findByPk(1);
    await class1.increment(
      { size: account.count },
      {
        where: {
          id: 1,
        },
      }
    );
    await account.addClass(2, {
      through: { quantity: 1, classSize: account.count },
    });
    const class2 = await Class.findByPk(2);
    await class2.increment(
      { size: account.count },
      {
        where: {
          id: 2,
        },
      }
    );
  }
  if (account.id === 3) {
    await account.addClass(1, {
      through: { quantity: 1, classSize: account.count },
    });
    const class1 = await Class.findByPk(1);
    await class1.increment(
      { size: account.count },
      {
        where: {
          id: 1,
        },
      }
    );
  }
  if (account.id === 4) {
    await account.addClass(1, {
      through: { quantity: 1, classSize: account.count },
    });
    const class1 = await Class.findByPk(1);
    await class1.increment(
      { size: account.count },
      {
        where: {
          id: 1,
        },
      }
    );
  }
});

module.exports = Account;
