const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const path = require("path");
// const getRoute = require('./Routes/getRoute')
 const app = express();
 const session = require('express-session');
const mongoose  = require("mongoose");
const bodyParser = require('body-parser');
const { error } = require("console");
const FeedbackModel = require('./Models/FeedbackModel');
const {addFeedback,getFeedbackList} = require('./Models/feedbackoperation');
 app.use (express.static("public"));



 //ejs work

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the layout file
app.set('layout', 'layouts/mainlayout'); // The layout file is in the layouts folder

// Use express-ejs-layouts middleware
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));








// Define all routes
//for Homepage
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// //Form
// // app.get("/calculator", (req, res) => {

// //   res.render('partials/Form/Calculator' , { title: 'Home' });
  
// });
//Form
app.get("/calculator", (req, res) => {
  res.render('partials/Form/Calculator', { results: req.session.results || [] });
});



//Residencies
app.get("/buy", (req, res) => {

  res.render('partials/Residencies/Buy' , { title: 'Home' });
});
app.get("/sale", (req, res) => {

  res.render('partials/Residencies/Sale' , { title: 'Home' });
});
app.get("/rent", (req, res) => {

  res.render('partials/Residencies/Rent' , { title: 'Home' });
});

//Connect

app.get("/contactus", (req, res) => {

  res.render('partials/Connect/ContactUs' , { title: 'Home' });
});
app.get("/ourservices", (req, res) => {

  res.render('partials/Connect/OurServices' , { title: 'Home' });
});
app.get("/aboutus", (req, res) => {

  res.render('partials/Connect/AboutUs' , { title: 'Home' });
});


// Render the login & register page
app.get("/register", (req, res) => {

  res.render('partials/Login/Register' , { title: 'Home' });
});

app.get('/login', (req, res) => {
  res.render('partials/Login/Login' , { title: 'Home' });
});

//Form submission Handling







const {createNewUser} = require("./Models/createUser");

// Handle register form submission
app.post('/register', async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Store the registered user (in-memory for simplicity, you would use a database)
  await createNewUser(res, fname, lname, email, password);

  // Redirect the user to the login page after successful registration
  return;
});

// server.js
app.post('/calculator', (req, res ) => {
  const operand1 = parseFloat(req.body.operand1);
  const operand2 = parseFloat(req.body.operand2);
  const operation = req.body.operation;

  let result;
  switch (operation) {
    case 'add':
      result = operand1 + operand2;
      break;
    case 'subtract':
      result = operand1 - operand2;
      break;
    case 'multiply':
      result = operand1 * operand2;
      break;
    case 'divide':
      result = operand1 / operand2;
      break;
    default:
      result = 'Invalid operation';
  }

  if (!req.session.results) {
    req.session.results = [];
  }

  req.session.results.push({
    operand1,
    operand2,
    operation,
    result,
  });


  res.redirect('/calculator');
});


const {loginUser} = require("./Models/loginUser");

// Handle login form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try{
    const isUser = await loginUser(email, password);

    if(isUser){
      console.log("Logged In...");
      res.redirect('/');
    }else{
      console.log("User not exists");
      res.redirect('/login');
    }
  }catch(e){

  }

});

// Render the register page
app.get('/register', (req, res) => {
  res.render('register' , { title: 'Home' });
});






// app.use(express.static(path.join(__dirname, 'Views')));




app.get('/about', (req, res) => {
  res.render('about', { title: 'AboutUs' });
});






// app.use(express.static(path.join(__dirname, 'public')));

// const homepagePath = path.join(__dirname,  'Views', 'HomePage');
// app.use('/', express.static(homepagePath));

// const aboutUsPath = path.join(__dirname,  'Views', 'AboutUs');
// app.use('/aboutus', express.static(aboutUsPath));






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