const db = require("../connection/index");
const { getAllUsersAPI } = require("./userController");

module.exports = {
  addUser: async (req, res) => {
    try {
      let response = await getAllUsersAPI();
      let user = response.values;
      for (let i = 0; i < user.length; i++) {
        console.log(users[i].displayName);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
