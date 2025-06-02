const pool = require("../db");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { promisify } = require("util");
const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
dotenv.config();
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
exports.logout = (req, res) => {
  // res.clearCookie("jwt",);
  // res.status(200).json({ message: "Logged out successfully" });
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { email, name, password, confirmPassword } = req.body;

  if (!email || !name || !password || !confirmPassword) {
    return next(new AppError("All fields are required", 400));
  }
  if (!validator.validate(email)) {
    return next(new AppError("this email is not vaild", 400));
  }

  // simple confirm password match
  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = (await userModel.createUser(name, email, hashedPassword))
    .rows[0];

  createSendToken(res, 201, user); // set cookie or return user
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("please enter email and password", 400));
  const validEmail = validator.validate(email);
  if (!validEmail) return next(new AppError("please Enter valid Email", 400));
  const rows = await pool.query(
    `
            SELECT *
            FROM users
            WHERE email = $1
        `,
    [email]
  );
  const user = rows?.rows?.[0];
  console.log(user);
  if (!user) return next(new AppError("there is no user with that email", 400));
  const checkPassword = await bcrypt.compare(password, user.password);
  console.log(password + " password");
  console.log(user.password + " check password");
  if (!checkPassword) return next(new AppError("password is wrong", 400));
  createSendToken(res, 200, user);
});
// exports.isLoggedIn = catchAsync(async (req, res, next) => {

//   // Check if JWT cookie exists
//   if (!req.cookies?.jwt) {
//     return next(new AppError("You are not logged in. Please log in.", 401));
//   }
//   // Verify the token
//   const token = req.cookies.jwt;
//   const decoded = await promisify(jwt.verify)(
//     token,
//     process.env.JSON_WEB_TOKEN_SECRET_KEY
//   );

//   // Get user from database
//   const currentUser = await userModel.getUser(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError("Your login session is invalid. Please log in again.", 401)
//     );
//   }
//   console.log("current user " + currentUser);
//   // Attach user to response locals
//   res.locals.user = currentUser;

//   next();
// });
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  console.log("Cookies received:", req.cookies); // Debug

  const token = req.cookies?.jwt;
  if (!token) {
    console.log("❌ No JWT cookie found.");
    return next(new AppError("You are not logged in. Please log in.", 401));
  }

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(
      token,
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );
    console.log("✅ Decoded JWT:", decoded);
  } catch (err) {
    console.log("❌ JWT verification failed:", err.message);
    return next(new AppError("Invalid or expired token.", 401));
  }

  const currentUser = await userModel.getUser(decoded.id);
  if (!currentUser) {
    console.log("❌ No user found for decoded token ID.");
    return next(new AppError("User no longer exists.", 401));
  }

  console.log("✅ Authenticated user:", currentUser.email || currentUser.id);
  res.locals.user = currentUser;
  next();
});
