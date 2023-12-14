const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const path = require("path");
// const getRoute = require('./Routes/getRoute')
 const app = express();
const mongoose  = require("mongoose");
const bodyParser = require('body-parser');
const { error } = require("console");
const FeedbackModel = require('./Models/FeedbackModel');
const {addFeedback,getFeedbackList} = require('./Models/feedbackoperation');






//ejs work

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use express-ejs-layouts middleware
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Set the layout file
app.set('layout', 'layouts/mainlayout'); // The layout file is in the layouts folder

 // Define routes
app.get('/', (req, res) => {
  res.render('HomePage/index', { title: 'HomePage' });
});

// app.get('/about', (req, res) => {
//   res.render('about', { title: 'AboutUs' });
// });






app.use(express.static(path.join(__dirname, 'public')));

// const homepagePath = path.join(__dirname,  'Views', 'HomePage');
// app.use('/', express.static(homepagePath));

const aboutUsPath = path.join(__dirname,  'Views', 'AboutUs');
app.use('/aboutus', express.static(aboutUsPath));





// Route to add feedback
app.post('/feedback', async (req, res) => {
    const  message  = req.body.message;
    const email = req.body.email
  
   
    try {
      // Call the function to add feedback
      const feedbackItem = await addFeedback(message,email);
    
      res.send(feedbackItem);
    } catch (error) {
      // Handle errors and send a 500 status with an error message
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route to get all feedback
  app.get('/feedback', async (req, res) => {
    try {
      // Call the function to get the list of all feedback
      const feedbackList = await getFeedbackList();
    
      res.send(feedbackList);
    } catch (error) {
    
        console.error('Error fetching feedback list:', error);
        res.status(500).json({ error: 'Error fetching feedback list' });
    }
  });
  

 // About mongoose

mongoose.connect("mongodb://127.0.0.1:27017/FeedbackModel",{
useNewUrlParser:true,
useUnifiedTopology:true,

}).then(()=>{
    console.log("Successfully Connected to DataBase")
}).catch((error)=>{

    console.log(error)
    console.log("error occured while connecting to database")
}
)




app.listen(3000 , () => {
  
} );