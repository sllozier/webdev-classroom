const { Account } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await Account.byToken(token);
    req.user = user;
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.userType !== "ADMIN") {
      console.log("NOT AN ADMIN!");
      res.status(403).send("not an admin");
    }
  } catch (error) {
    next(error);
  }
};

function splitFullName(fullName) {
  const parts = fullName.trim().split(/\s+/); // Split by one or more spaces
  const fName = parts[0] || ""; // First name is the first part
  let lName = "";

  if (parts.length > 1) {
    lName = parts.slice(1).join(" "); // Join the remaining parts as the last name
  }

  return { fName, lName };
}

function generateUserName(email) {
  const [userName] = email.split("@"); // Get the part of the email before the '@'
  return userName.toLowerCase(); // Convert to lowercase to ensure consistency
}

module.exports = {
  requireToken,
  isAdmin,
  splitFullName,
  generateUserName,
};

// const { User, Student } = require('../db');

// const requireUserToken = async (req, res, next) => {
//     try{
//         const token = req.headers.authorization
//         const user = await Account.byToken(token)
//         req.user = user
//     }catch(error){
//         next(error);
//     }
// };

// const requireStudentToken = async( req, res, next) => {
//     try{
//         const token = req.headers.authorization
//         const student = await Student.findByToken(token);
//         req.student = student;
//     }catch(error){
//         next(error);
//     }
// }

// const isAdmin = async(req, res, next) => {
//     try{
//         if(req.user.login !== "admin") {
//             console.log('NOT AN ADMIN!');
//             res.status(403).send('not an admin');
//         }
//     }catch(error){
//         next(error);
//     }
// };

// const isInstructor = async(req, res, next) => {
//     try{
//         if(req.user.login !== "instructor"){
//             console.log('NOT AN INSTRUCTOR');
//             res.status(403).send('not an instructor');
//         }
//     }catch(error){
//         next(error);
//     }
// }
// module.exports = {
//     requireUserToken,
//     requireStudentToken,
//     isAdmin,
//     isInstructor,
// };
