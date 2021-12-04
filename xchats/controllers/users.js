const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/users");

class userController {
  create = async (req, res) => {
    const errors = validationResult(req);

    // Check if there is errors and return them

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      // Encript password
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      let body = req.body;
      body.password = hashedPassword;

      // Check if user is registered
      const userExist = await User.findActive(req.body.user_id);

      if (userExist.length > 0) {
        return res.status(403).json({
          msg: "Already exist",
        });
      }

      // Check if username token
      const usernameExist = await User.findUsername(req.body.username);

      if (usernameExist.length > 0) {
        return res.status(403).json({
          msg: "Username is already used",
        });
      }

      const result = await User.insert(body);

      return res.status(200).json({
        msg: "Created",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };

  getAll = async (req, res) => {
    try {
      const results = await User.findAll();

      return res.status(200).send(results);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };

  getOne = async (req, res) => {
    try {
      const result = await User.find(req.params.user_id);
      if (result.length <= 0) {
        return res.status(400).json({ msg: "User not found!" });
      }
      delete result[0].password;

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };

  changeInfo = async (req, res) => {
    const errors = validationResult(req);

    // Check if there is errors and return them

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      // Check if user is registered
      const userExist = await User.findActive(req.params.user_id);

      if (userExist.length == 0) {
        return res.status(404).json({
          msg: "Not found",
        });
      }

      // Check if username token
      const usernameExist = await User.findUsernameAndId(
        req.body.username,
        req.params.user_id
      );
      if (usernameExist.length > 0) {
        return res.status(403).json({
          msg: "Username is already used",
        });
      }
      const result = await User.update(req.body, req.params.user_id);
      return res.status(201).json({
        msg: "Updated",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
  disactive = async (req, res) => {
    try {
      // Check if user is registered
      const userExist = await User.findActive(req.params.user_id);

      if (userExist.length == 0) {
        return res.status(404).json({
          msg: "Not found",
        });
      }
      const result = await User.disactive(req.params.user_id);
      return res.status(201).json({
        msg: "Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
  activate = async (req, res) => {
    try {
      // Check if user is registered
      const userExist = await User.findDisactive(req.params.user_id);

      if (userExist.length == 0) {
        return res.status(404).json({
          msg: "Not found",
        });
      }
      const result = await User.activate(req.params.user_id);
      return res.status(201).json({
        msg: "Activated",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
  delete = async (req, res) => {
    try {
      // Check if user is registered
      const userExist = await User.find(req.params.user_id);

      if (userExist.length == 0) {
        return res.status(404).json({
          msg: "Not found",
        });
      }
      const result = await User.delete(req.params.user_id);
      return res.status(200).json({
        msg: "Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
}

module.exports = userController;
