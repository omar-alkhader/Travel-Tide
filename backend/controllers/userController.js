const pool = require("../db");
exports.getAllUsers = async (req, res, next) => {
  const users = await pool.query(`SELECT *
        FROM users`);
  console.log(users.rows);
  res.status(200).json({
    status: "success",
    data: {
      users: users.rows,
    },
  });
};
