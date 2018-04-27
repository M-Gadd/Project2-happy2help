const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const Country = require("../models/Country");

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
});


  const storage =
  cloudinaryStorage({
    cloudinary,
    folder: 'more-movies',
    params: {
      resource_type: "raw"
    }
  });

const upload = multer({ storage })



const router = express.Router();

router.get("/", (req, res, next) => {
  if (!req.user) {
    next();
    return;
  } else {
    res.render("admin/admin");
  }
});

// router.get("/", (req,res,next) => {
// });

router.get("/user-list", (req, res, next) => {
  User.find()
    .then(usersFromDb => {
      res.locals.userList = usersFromDb;
      res.render("admin/user-list");
    })
    .catch(err => {
      next(err);
    });
  });
  
router.get("/add-country", (req,res,next) => {
  res.render("admin/country-form")
})



router.post("/process-country", upload.fields([{name: "imageFile"}, {name:"videoFile"}]), (req,res,next) => {
  const {name, description, language, currency} = req.body;
  // res.send(req.files)
  // return;
  const {originalname, secure_url} = req.files["imageFile"][0];
  const video = req.files['videoFile'].map(function(vid){
    const {originalname, secure_url} = vid;
    return {name: originalname, mediaFile: secure_url}
  })

  Country.create({
    name, 
    description,
    language,
    currency,
    pictureUrl: secure_url,
    videos: video
  })
   .then(()=> {
     res.redirect("/admin");
    
   })
   .catch((err)=>{
     next(err);
   });
  });

  router.get("/country-list", (req,res,next)=>{
    Country.find()
    .then(countryFromDb => {
      res.locals.countryList = countryFromDb;
      res.render("admin/countries-list");
    })
    .catch(err => {
      next(err);
    });
  })

  router.get("/country-list/:countryId/delete", (req, res, next) => {
    if (!req.user || req.user.role !== "Admin") {
      res.redirect("/");
      return;
    }
    Country.findByIdAndRemove(req.params.countryId)
      .then(() => {
        res.redirect("/admin/country-list");
      })
      .catch(err => {
        next(err);
      });
  });

 


  router.get("/country-list/:countryId/change", (req, res, next) => {
    if (!req.user || req.user.role !== "Admin") {
      res.redirect("/");
      return;
    } 
      
    Country.findById(req.params.countryId)
      .then(dataCountry => {
        res.render("admin/single-country", {dataCountry});
      })
      .catch(err => {
        next(err);
      });
  });

  router.post("/edit/:countryId/process-country", upload.fields([{name: "imageFile"}, {name:"videoFile"}]), (req, res, next) => {
    if (!req.user || req.user.role !== "Admin") {
      res.redirect("/");
      return;
    }
    // if (!(req.files["imageFile"])) {
    //   imageFile 
    // }
    const {name, description, language, currency} = req.body;
    const {originalname, secure_url} = req.files["imageFile"][0];
    const video = req.files['videoFile'].map(function(vid){
      const {originalname, secure_url} = vid;
      return {name: originalname, mediaFile: secure_url}
    })
      // if (req.files.)
    Country.findByIdAndUpdate(
      req.params.countryId,
      { $set: {name, description, language, currency, pictureUrl: secure_url},
        $push: { videos: { $each: video } } },
      { runValidators: true }
    )
      .then(() => {
        res.redirect("/admin/country-list");
      })
      .catch(err => {
        next(err);
      });
  });


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.get("/users/:userId/delete", (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    res.redirect("/");
    return;
  }
  User.findByIdAndRemove(req.params.userId)
    .then(() => {
      res.redirect("/admin/user-list");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/add-country", (req, res, next) => {
  res.render("admin/country-form");
});

router.get('/users/:userId/makeadmin', (req, res, next)=>{
  User.findByIdAndUpdate(
    req.params.userId,
    { $set: { role: "Admin" }},
    {runValidators: true}
  )
  .then(()=>{
    res.redirect("/admin/user-list");
  })
  .catch((err)=>{
    console.log('something went wrong', err);
  })
});


// router.post(
//   "process-country",
//   upload.single("blahUpload"),
//   (req, res, next) => {
//     const { name, description, language, currency } = req.body;
//     const { originalname, secure_url } = req.file;

//     Country.create({
//       name,
//       description,
//       language,
//       currency,
//       imageName: originalname,
//       imageUrl: secure_url
//     })
//       .then(() => {
//         res.redirect("/");
//       })
//       .catch(err => {
//         next(err);
//       });
//     res.send(req.file);
//   }
// );

module.exports = router;
