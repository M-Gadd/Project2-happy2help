const mongoose = require("mongoose");
const User = require('../models/User');
const Country = require("../models/Country");

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true}) 
  // 'mongodb://localhost/project-2-happy2help'
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  
  const superAdmin = {
    username: "superAdmin",
    password: "123", 
    email: "gad.mostafa@icloud.com",
    role: "Admin",
    status: "Active",
    nationality: "French",
    prefered_Language: "EN",
    // pictureUrl: ""
  }


  User.create(superAdmin) 
    .then((userDetails)=>{
      console.log("success creating superAdmin" + userDetails);
      
    })
    .catch((err)=>{
      next(err);
    })

