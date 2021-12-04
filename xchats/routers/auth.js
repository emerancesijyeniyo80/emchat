const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middleware/checkAuth");

const authController = require("../controllers/auth");

const router = express.Router();

const Auth = new authController();
// Login part

// @route Post api/users/login
// @desc login as users
// @public
router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  Auth.userLogin
);

// @route GET api/auth/currentuser
// @desc View loged in users
// @private
router.get("/currentuser", checkAuth, Auth.getCurrentUser);
module.exports = router;
