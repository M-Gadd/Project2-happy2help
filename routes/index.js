const express = require('express');
const router  = express.Router();

const Food = require("../models/Food");

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

router.get('/culture/food/add', (req, res, next) => {
  res.render('sub-pages/food-form');
});

router.post('/process-resto', (req, res, next) => {
  const { name, description, latitude, longitude } = req.body;
  const location = {
    type: 'Point',
    coordinates: [ latitude, longitude ]
  };

  Food.create({ name, description, location })
    .then(() => {
      res.redirect('/culture/food');
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/culture/food", (req, res, next) => {
  Food.find()
    .then((restosFromDb) => {
      res.json(restosFromDb);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/how-to-get-around/transport", (req,res,next) => {
  res.render("sub-pages/transport");
})


module.exports = router;
