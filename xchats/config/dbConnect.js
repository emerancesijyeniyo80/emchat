const config = require("config");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  socketPath: config.get("socketPath"),
  host: config.get("host"),
  user: config.get("user"), // univmlhx_univmlhx
  password: config.get("password"), // H.S(LdwU~_-I
  database: config.get("database"), // univmlhx_xchats
  waitForConnections: config.get("waitForConnections"),
  connectionLimit: config.get("connectionLimit"),
  queueLimit: config.get("queueLimit"),
});
module.exports = pool;
