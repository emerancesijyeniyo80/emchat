const pool = require("../config/dbConnect");

// Query category
exports.find = async (user_category_id) => {
  try {
    const query =
      "SELECT * FROM user_categories WHERE user_category_id = ? AND status = ?";
    let result = await pool.query(query, [user_category_id, 1]);
    return result[0];
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
