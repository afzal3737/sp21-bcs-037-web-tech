const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
  });
  
const model = mongoose.model('user', userSchema);
module.exports = model

