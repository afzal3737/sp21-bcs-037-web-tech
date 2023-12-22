const mongoose = require("mongoose")



const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  // Create a Mongoose model
const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback

