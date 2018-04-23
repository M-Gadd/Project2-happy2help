const express = require("express");
const User= require("../models/User");
const passport = require('passport');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const Country = require('../models/Country');



cloudinary.config ({
  cloud_name: process.env.cloudinary_name ,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret 
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "countries"
});

const upload = multer({ storage });

const router = express.Router();


router.get("/", (req,res,next)=>{
  if(!req.user) {
    next();
    return;
  } 
  else {res.render("admin/admin");}
})

  // router.get("/", (req,res,next) => {
  // });

  router.get("/user-list", (req,res,next) => {
    User.find()
    .then((usersFromDb)=>{
      res.locals.userList = usersFromDb;
      res.render("admin/user-list");
    })
    .catch((err)=>{
      next(err);
    });
  });
  
router.get("/add-country", (req,res,next) => {
  res.render("admin/country-form")
})

router.post("process-country", upload.single('blahUpload'), (req,res,next) => {
  const {name, description, language, currency} = req.body;
  const {originalname, secure_url} = req.file;

  Country.create({
    name, 
    description,
    language,
    currency,
    imageName: originalname,
    imageUrl: secure_url
  })
   .then(()=> {
     res.redirect("/");
   })
   .catch((err)=>{
     next(err);
   });
   res.send(req.file);

})



module.exports = router;