const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router
  .route("/signup")
  .get(userController.renderSignup)
  .post(userController.signup);

router
  .route("/login")
  .get(userController.renderLogin)
  .post(userController.login);

router.get("/logout", userController.logout);

module.exports = router;
