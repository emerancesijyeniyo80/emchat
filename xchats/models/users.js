const pool = require("../config/dbConnect");

// Query all users
exports.findAll = async () => {
  try {
    const query =
      "SELECT u.user_id,u.user_category_id,u.fname,u.lname,u.username,u.status,uc.user_category FROM users u,user_categories uc WHERE u.user_category_id = uc.user_category_id AND  u.status = ? AND uc.status = ?";
    let result = await pool.query(query, [1, 1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find by user id
exports.find = async (id) => {
  try {
    const query =
      "SELECT u.*,uc.user_category_id,uc.user_category FROM users u, user_categories uc WHERE u.user_id = ? AND u.user_category_id = uc.user_category_id AND u.status = ? AND uc.status";

    let result = await pool.query(query, [id, 1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find by user id
exports.findActive = async (id) => {
  try {
    const query =
      "SELECT u.*,uc.user_category_id,uc.user_category FROM users u, user_categories uc WHERE u.user_id = ? AND u.user_category_id = uc.user_category_id AND u.status = ? AND uc.status";
    let result = await pool.query(query, [id, 1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find by user id
exports.findDisactive = async (id) => {
  try {
    const query = "SELECT * FROM users WHERE user_id = ? AND status = ?";
    let result = await pool.query(query, [id, 0]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find user by username
exports.findUsername = async (username) => {
  try {
    const query =
      "SELECT u.*,uc.user_category_id,uc.user_category FROM users u, user_categories uc WHERE u.username = ? AND u.user_category_id = uc.user_category_id AND u.status = ? AND uc.status";
    let result = await pool.query(query, [username, 1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find user by username and id
exports.findUsernameAndId = async (username, id) => {
  try {
    const query =
      "SELECT * FROM users WHERE username = ? AND user_id != ? AND status = ?";
    let result = await pool.query(query, [username, id, 1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Insert user into database
exports.insert = async (data) => {
  try {
    const query =
      "INSERT INTO users (user_category_id,fname,lname,username,password) VALUES (?,?,?,?,?)";
    let result = await pool.query(query, [
      data.user_category_id,
      data.fname,
      data.lname,
      data.username,
      data.password,
    ]);
    return result.affectedRows;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

// Update user profile
exports.update = async (data, id) => {
  try {
    const query =
      "UPDATE users SET user_category_id = ?, fname = ?,lname = ?,username = ? WHERE user_id = ? AND status = ?";
    let result = await pool.query(query, [
      data.user_category_id,
      data.fname,
      data.lname,
      data.username,
      id,
      1,
    ]);
    return result.affectedRows;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Change user password
exports.changePassword = async (data) => {
  try {
    const query =
      "UPDATE users SET password = ? WHERE user_id = ? AND status = ?";
    let result = await pool.query(query, [data.password, data.user_id, 1]);
    return result.affectedRows;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

// Disactive user
exports.disactive = async (id) => {
  try {
    const query =
      "UPDATE users SET status = ? WHERE user_id = ? AND status = ?";
    let result = await pool.query(query, [0, id, 1]);
    return result.affectedRows;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

// Activate user
exports.activate = async (id) => {
  try {
    const query =
      "UPDATE users SET status = ? WHERE user_id = ? AND status = ?";
    let result = await pool.query(query, [1, id, 0]);
    return result.affectedRows;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

// Delete user
exports.delete = async (id) => {
  try {
    const query = "DELETE FROM users WHERE user_id = ?";
    let result = await pool.query(query, [id]);
    return result.affectedRows;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
