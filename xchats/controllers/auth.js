const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/users");

class authController {
  userLogin = async (req, res, next) => {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    try {
      const userData = await User.findUsername(req.body.username);
      if (userData.length < 1) {
        return res.status(400).json({
          msg: "Wrong Username or Password!, Please try Again or Contact Administrator.",
        });
      }
      const isEqual = await bcrypt.compare(
        req.body.password,
        userData[0].password
      );
      if (!isEqual) {
        return res.status(400).json({
          msg: "Wrong Username or Password!, Please try Again or Contact Administrator.",
        });
      }
      const token = jwt.sign(
        {
          user_id: userData[0].user_id,
          fname: userData[0].fname,
          fname: userData[0].fname,
          username: userData[0].username,
        },
        config.get("jwtSecret"),
        {
          expiresIn: "6h",
        }
      );

      delete userData[0].password;

      return res.status(200).json({
        msg: "User login Successfully",
        data: userData[0],
        token: token,
        resultCount: userData.length,
      });
    } catch (error) {
      return next(error);
    }
  };

  getCurrentUser = async (req, res) => {
    try {
      const userRlt = await User.findActive(req.currentUser.user_id);
      if (userRlt.length <= 0) {
        return res.status(400).json({ message: "Not authorized" });
      }

      delete userRlt[0].password;

      return res.status(200).send(...userRlt);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
}

module.exports = authController;
