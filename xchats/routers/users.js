const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middleware/checkAuth");

const userController = require("../controllers/users");

const router = express.Router();

const User = new userController();
// @route POST api/users
// @desc Create user
// @private
router.post(
  "/",
  [
    check("user_category_id", "user_category_id is required").not().isEmpty(),
    check("fname", "First name is required").not().isEmpty(),
    check("lname", "Last name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is not strong").isLength({ min: 5 }),
  ],
  User.create
);

// @route GET api/users
// @desc view all users
// @private
router.get("/", checkAuth, User.getAll);
// @route GET api/:id
// @desc view all user by id
// @private
router.get("/:user_id", checkAuth, User.getOne);

// @route PUTCH api/users
// @desc Change user info
// @private
router.patch(
  "/:user_id",
  checkAuth,
  [
    check("fname", "First name is required").not().isEmpty(),
    check("lname", "Last name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
  ],
  User.changeInfo
);
// @route PUTCH api/users
// @desc Activate user
// @private
router.patch("/activate/:user_id", checkAuth, User.activate);
// @route DELETE api/users
// @desc Delete user
// @private
router.delete("/:user_id", checkAuth, User.delete);
// @route DELETE api/users
// @desc Delete user
// @private
router.delete("/disactive/:user_id", User.disactive);

module.exports = router;
