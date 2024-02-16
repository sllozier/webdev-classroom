const router = require("express").Router();
const { Account } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { splitFullName, generateUserName } = require("./gateKeeper");
require("dotenv").config();
const JWT = process.env.TOKEN;
const SALT_ROUNDS = 5;

// === credential verification === //

// verifies token, returns associated user (might need refactor later)
router.get("/", async (req, res, next) => {
  try {
    const account = await Account.byToken(req.headers.authorization);
    res.send(account);
  } catch (error) {
    next(error);
  }
});

//login
// verifies user credentials, returns user with token attached
router.post("/login", async (req, res, next) => {
  try {
    const token = await Account.authenticate(req.body);

    res.send(token);
  } catch (error) {
    next(error);
  }
});

//if loging in with oauth
router.post("/google-login", async (req, res, next) => {
  try {
    const { googleId, email, name, picture } = req.body;

    //Split the name into first and last
    const { fName, lName } = splitFullName(name);

    const userName = generateUserName(email);
    // Check if user already exists
    let user = await Account.findOne({ where: { email } });

    if (!user) {
      // If user does not exist, create new user
      user = await Account.create({
        email,
        fName,
        lName,
        userName,
        googleId,
        picture,
        password: bcrypt.hashSync(googleId, SALT_ROUNDS), // Use Google ID as password or generate a random one for internal use
      });
    } else if (!user.googleId) {
      // If user exists but doesn't have a googleId, update their record (link accounts)
      user.googleId = googleId;
      user.picture = picture;
      user.userName = userName;
      // Update fName and lName only if needed
      user.fName = fName || user.fName;
      user.lName = lName || user.lName;

      await user.save();
    }

    // Generate a token for the user
    const token = user.generateToken();
    res.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.fName,
      },
    });
  } catch (error) {
    next(error);
  }
});

//signup

// have to manually assign an id due to pk autoIncrement not working as intended
// this is a temporary fix - should try to figure this out when time allows
router.post("/signup", async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body);
    res.send({ token: await newAccount.generateToken(), id: newAccount.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
