const pool = require("../config/dbConnect");

// Query all chats
exports.findAll = async () => {
  try {
    const query = "SELECT * FROM text_chats WHERE status = ?";
    let result = await pool.query(query, [1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
// Find by text chat id
exports.find = async (id) => {
  try {
    const query =
      "SELECT * FROM text_chats WHERE text_chat_id = ? AND status = ?";

    let result = await pool.query(query, [id, 1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

// Find by chat id
exports.findByChatId = async (id) => {
  try {
    const query = "SELECT * FROM text_chats WHERE chat_id = ? AND status = ?";

    let result = await pool.query(query, [id, 0]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

// Insert chats into database
exports.insert = async (data) => {
  try {
    const query =
      "INSERT INTO text_chats (chat_id,sender,receiver,text_message) VALUES (?,?,?,?)";
    let result = await pool.query(query, [
      data.chat_id,
      data.sender_id,
      data.receiver_id,
      data.message,
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
    const query =
      "DELETE FROM text_chats WHERE text_chat_id = ? AND status = ?";
    let result = await pool.query(query, [id, 1]);
    return result.affectedRows;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
