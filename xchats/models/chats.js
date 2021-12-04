const pool = require("../config/dbConnect");

// Query all chats
exports.findAll = async () => {
  try {
    const query = "SELECT * FROM chats WHERE status = ?";
    let result = await pool.query(query, [1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find by chat id
exports.find = async (id) => {
  try {
    const query = "SELECT * FROM chats WHERE chat_id = ? AND status = ?";

    let result = await pool.query(query, [id, 0]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find by chat sender id
exports.findBySender = async (sender_id) => {
  try {
    const query = "SELECT * FROM chats WHERE sender_id = ? AND status = ?";
    let result = await pool.query(query, [sender_id, 0]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find by text chat by user id
exports.findByUserId = async (user_id) => {
  try {
    const query =
      "SELECT * FROM chats WHERE (sender_id = ? OR receiver_id = ?) AND status = ?";
    let result = await pool.query(query, [user_id, user_id, 0]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find by chat sender reciever id
exports.findBySenderReciever = async (sender_id, receiver_id) => {
  try {
    const query =
      "SELECT * FROM chats WHERE sender_id = ? AND receiver_id = ? AND status = ?";
    let result = await pool.query(query, [sender_id, receiver_id, 0]);
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
      "INSERT INTO chats (chat_id,sender_id,receiver_id) VALUES (?,?,?)";
    let result = await pool.query(query, [
      data.chat_id,
      data.sender_id,
      data.receiver_id,
    ]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

// Delete chat
exports.delete = async (id) => {
  try {
    const query = "DELETE FROM chats WHERE chat_id = ? AND status = ?";
    let result = await pool.query(query, [id, 1]);
    return result.affectedRows;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
