const axios = require("axios");

const getPeoples = async () => {
  const { data } = await axios.get(
    "https://dummyjson.com/users?skip=0&limit=100"
  );
  const users = data.users.map((user, i) => {
    return {
      fName: user.firstName,
      lName: user.lastName,
      userName: user.username,
      password: "password",
      email: user.email,
      userType: "USER",
    };
  });
  return users;
};
module.exports = getPeoples;
