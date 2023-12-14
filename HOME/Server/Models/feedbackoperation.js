// FeedbackOperations.js
const FeedbackModel = require('./FeedbackModel');

async function addFeedback(message,email) {
  try {
    let fm = new FeedbackModel();
    fm.email = email,
    fm.message = message
     let savedItem =await fm.save()
    return  savedItem
    
  } catch (error) {
    throw new Error('Error adding feedback');
  }
}

async function getFeedbackList() {
  try {
    const feedbackList = await FeedbackModel.find();
    return feedbackList;
  } catch (error) {
    throw new Error('Error fetching feedback list');
  }
}

module.exports.addFeedback = addFeedback
module.exports.getFeedbackList = getFeedbackList




