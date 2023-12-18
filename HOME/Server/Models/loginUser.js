const userModel = require("./userModel");

async function loginUser(email, password) {
    const user = await userModel.findOne({ email: email, password: password });
  
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  
  module.exports.loginUser = loginUser;