const passport = require('passport');

const User = require("../models/User");

function passportSetup(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req,res,next) => {
    res.locals.activeUser = req.user;
    next();
  });
}

module.exports = passportSetup;