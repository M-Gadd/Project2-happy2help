const express = require('express');
const router  = express.Router();

const Food = require("../models/Food");
const Medical = require("../models/Medical");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/get-started", (req,res,next) => {
  res.render("pages/get-started");
})


router.get("/get-started/lanVideos", (req,res,next) => {
  res.render("sub-pages/videos");
})

/////////// BEG of Medical

router.get("/get-started/medicalInfo", (req,res,next) => {
  res.render("sub-pages/medical");
})

router.get("/get-started/medicalInfo/add", (req,res,send)=>{
  res.render("sub-pages/medical-form");
})

router.post('/process-medic', (req, res, next) => {
  const { name, description, latitude, longitude } = req.body;
  const location = {
    type: 'Point',
    coordinates: [ latitude, longitude ]
  };

  Medical.create({ name, description, location })
    .then(() => {
      res.redirect('/get-started/medicalInfo');
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/get-started/medicalInfo", (req, res, next) => {
  Medical.find()
    .then((medicsFromDb) => {
      res.json(medicsFromDb);
    })
    .catch((err) => {
      next(err);
    });
});


/////////// END of Medical

router.get("/get-started/adminOffices", (req,res,next) => {
  res.render("sub-pages/adminOffices");
})

/////////// >>>>>>>> BEG of Culture <<<<<<<<<<<<

router.get("/culture", (req,res,next) => {
  res.render("pages/culture-awarness");
});

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
      res.locals.restos = restosFromDb;
      // res.json(restosFromDb);
      res.render("sub-pages/foodmap");
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/food/:foodId/accept', (req, res, next)=>{
  Food.findByIdAndUpdate(
    req.params.foodId,
    { $set: { status: 'Active' }},
    {runValidators: true}
  )
  .then(()=>{
    res.redirect('/culture/food');
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/food/:foodId/delete', (req, res, next)=>{
  Food.findByIdAndRemove(req.params.foodId)
  .then(()=>{
    res.redirect("/culture/food");
  })
  .catch((err)=>{
    next(err);
  })
})

router.get("/resto/data", (req, res, next) => {
  Food.find()
    .then((restosFromDb) => {
      res.json(restosFromDb);
    })
    .catch((err) => {
      next(err);
    });
});

/////////// >>>>>>>>>>>>>>>> END of Culture <<<<<<<<<<<<<<<<<<<<


/////////// BEG of HOW_TO_GET_AROUND

router.get("/how-to-get-around", (req,res,next) => {
  res.render("pages/htga");
})

router.get("/how-to-get-around/transport", (req,res,next) => {
  res.render("sub-pages/transport");
})

/////////// END of HOW_TO_GET_AROUND


module.exports = router;
