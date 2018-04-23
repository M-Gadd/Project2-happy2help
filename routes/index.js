const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/get-started", (req,res,next) => {
  res.render("pages/get-started");
})

router.get("/culture", (req,res,next) => {
  res.render("pages/culture-awarness");
})

router.get("/how-to-get-around", (req,res,next) => {
  res.render("pages/htga");
})

router.get("/get-started/lanVideos", (req,res,next) => {
  res.render("sub-pages/videos");
})

router.get("/get-started/medicalInfo", (req,res,next) => {
  res.render("sub-pages/medical");
})

router.get("/get-started/adminOffices", (req,res,next) => {
  res.render("sub-pages/adminOffices");
})

router.get("/culture/food", (req,res,next) => {
  res.render("sub-pages/foodmap");
})

router.get("/how-to-get-around/transport", (req,res,next) => {
  res.render("sub-pages/transport");
})


module.exports = router;
