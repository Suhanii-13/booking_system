const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      console.log(req.body);
      const { username, role, password } = req.body;
      const newUser = new User({ role, username });
      const registeredUser = await User.register(newUser, password);

      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome");
        res.redirect("/home");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

// Login routes
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  wrapAsync(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash(
          "error",
          "Incorrect username or password. Please try again or sign up!"
        );
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome back !");
        const redirectUrl = req.session.returnTo || "/home";
        delete req.session.returnTo;
        return res.redirect(redirectUrl);
      });
    })(req, res, next);
  })
);

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", "You’re logged out");
    res.redirect("/home");
  });
});

module.exports = router;
