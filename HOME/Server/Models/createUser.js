const userModel = require("./userModel");

async function createNewUser(res, fname, lname, email, password) {
    console.log("Creating user...");

    let user = new userModel();

    user.fname = fname;
    user.lname = lname;
    user.email = email;
    user.password = password;

    const isEmailExists = await userModel.findOne({email: user.email});

    if(isEmailExists){
        console.log('Email already exists.');
        res.redirect('/register');
    }
    else{
        await user.save();
        console.log("User saved successfully.");
        res.redirect("/login");
    }
}

module.exports= { createNewUser };