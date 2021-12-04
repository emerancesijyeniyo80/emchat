const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    const decoded = await jwt.verify(token, config.get("jwtSecret"));
    req.currentUser = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      msg: "Auth failed",
    });
  }
};
