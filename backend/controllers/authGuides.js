const pool = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

function signToken(id) {
  return jwt.sign({ id }, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
    expiresIn: "14d",
  });
}
const createSendToken = (res, statusCode, user) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: false,
    sameSite: "lax",
    secure: false, // only true in production (with HTTPS)
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    user,
    token,
  });
};
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("please enter email and password", 400));
  const validEmail = validator.validate(email);
  if (!validEmail) return next(new AppError("please Enter valid Email", 400));
  const rows = await pool.query(
    `
              SELECT *
              FROM guide
              WHERE email = $1
          `,
    [email]
  );
  const user = rows?.rows?.[0];
  console.log(user);
  if (!user) return next(new AppError("there is no user with that email", 400));
  const checkPassword = await bcrypt.compare(password, user.password);
  console.log(password);
  console.log(checkPassword);
  if (!checkPassword) return next(new AppError("password is wrong", 400));
  createSendToken(res, 200, user);
});
exports.logout = (req, res) => {
  // res.clearCookie("jwt",);
  // res.status(200).json({ message: "Logged out successfully" });
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
  });
};
