const express = require('express');
const router  = express.Router();


const Food = require("../models/Food");
const Medical = require("../models/Medical");
const User = require("../models/User");
const Country = require("../models/Country");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/get-started/lanVideos", (req,res,next) => {
  // res.render("sub-pages/videos");

  Country.find({name: req.user.prefered_country})
    .then(userCountry => {
      res.locals.showingVideo = userCountry[0].videos;
      console.log(res.locals.showingVideo)
      res.render("sub-pages/videos")
  })

    .catch((err)=>{
      next(err);
    })
})

/////////// BEG of Medical
router.post('/process-medic', (req, res, next) => {
  const { name, description, type, latitude, longitude } = req.body;
  const location = {
    type: 'Point',
    coordinates: [ latitude, longitude ]
  };

  Medical.create({ name, description, type, location })
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
      // res.send(medicsFromDb);
      res.locals.medics = medicsFromDb;
      res.render("sub-pages/medical")
    })
    .catch((err) => {
      next(err);
    });
});


router.get("/medical/data", (req, res, next) => {
  Medical.find()
    .then((medsFromDb) => {
      res.json(medsFromDb);
    })
    .catch((err) => {
      next(err);
    });
});



/////////// END of Medical

router.get("/get-started/adminOffices", (req,res,next) => {
  res.render("sub-pages/adminOffices");
})

router.get('/get-started/medicalInfo/:medicalId/accept', (req, res, next)=>{
  Medical.findByIdAndUpdate(
    req.params.medicalId,
    { $set: { status: 'Active' }},
    {runValidators: true}
  )
  .then(()=>{
    res.redirect('/get-started/medicalInfo');
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/get-started/medicalInfo/:medicalId/delete', (req, res, next)=>{
  Medical.findByIdAndRemove(req.params.medicalId)
  .then(()=>{
    res.redirect("/get-started/medicalInfo");
  })
  .catch((err)=>{
    next(err);
  })
})

/////////// >>>>>>>> BEG of Culture <<<<<<<<<<<<

router.get('/culture/food/add', (req, res, next) => {
  res.render('sub-pages/food-form');
});

router.post('/process-resto', (req, res, next) => {
  const { name, description, type, latitude, longitude } = req.body;
  const location = {
    type: 'Point',
    coordinates: [ latitude, longitude ]
  };

  Food.create({ name, description, type, location })
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

router.get("/how-to-get-around/transport", (req,res,next) => {
  res.render("sub-pages/transport");
})

/////////// END of HOW_TO_GET_AROUND

router.get('/test', (req, res, next)=>{
  res.render('sub-pages/test')
})


module.exports = router;
