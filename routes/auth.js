const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const nationality = req.body.nationality;
  const status = req.body.status;
  const role = req.body.role;
  const prefered_Language = req.body.prefered_Language;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
      username,
      password: hashPass,
      email,
      nationality,
      status,
      role,
      prefered_Language
    })
      .then(userDet => {
        console.log("created" + userDet.username);
        res.redirect("/");
      })
      .catch(() => {
        console.log("error creating the user");
      });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

authRoutes.get("/edit", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  res.render("auth/edit");
});

authRoutes.post("/edit", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  const { username, email, nationality, prefered_Language } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { username, email, nationality, prefered_Language },
    { runValidators: true }
  )
    .then(() => {
      res.redirect("/auth/account-details");
    })
    .catch(err => {
      next(err);
    });
});

authRoutes.get("/account-details", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  res.render("auth/account-details");
});

authRoutes.get("/edit-password", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  res.render("auth/edit-password");
});

authRoutes.post("/edit-password", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }

  User.findById(req.user._id)
    .then(userDetails => {
      console.log(userDetails);
      let { password } = userDetails;
      const { passwordOld } = req.body;
      if (!bcrypt.compareSync(passwordOld, password)) {
        //FLASH! your old password is incorrect. try again
        res.redirect("/auth/login");
        return;
      }
      const { passwordNew, passwordNew1 } = req.body;
      if (passwordNew !== passwordNew1) {
        res.redirect("/auth/login");
        //FLASH! you need to type your new password correctly twice
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(passwordNew1, salt);

      User.findByIdAndUpdate(
        req.user._id,
        { password },
        { runValidators: true }
      )
        .then(details => {
          console.log(details);
          res.redirect("/auth/account-details");
          //FLASH! Congratulations! you changed your password
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = authRoutes;
