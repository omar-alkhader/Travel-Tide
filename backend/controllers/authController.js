const pool = require("../db");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
dotenv.config();
function signToken(id) {
  return jwt.sign({ id }, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
    expiresIn: "14d",
  });
}
exports.signup = async (req, res, next) => {
  try {
    const { email, username, password, passwordConfirm } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(process.env.JSON_WEB_TOKEN_SECRET_KEY);
    const query = await pool.query(
      `
                INSERT INTO users(username,email,password)
                VALUES($1,$2,$3) RETURNING *
            `,
      [username, email, hashedPassword]
    );
    const user = query.rows[0];
    const token = signToken(user.id);

    res.status(201).json({
      status: "success",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      err,
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("please enter email and password");
    const validEmail = validator.validate(email);
    if (!validEmail) throw new Error("please Enter valid Email");
    const rows = await pool.query(
      `
            SELECT *
            FROM users
            WHERE email = $1
        `,
      [email]
    );
    const user = rows?.rows?.[0];
    if (!user) throw new Error("there is no user with that email");
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(checkPassword);
    if (!checkPassword) throw new Error("password is wrong");
    let token = signToken(user.id);
    res.status(500).json({
      status: "wait",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};
