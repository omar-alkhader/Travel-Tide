const AppError = require("../utlis/AppError");

function handlePostgresErrors(err) {
  if (err.code === "23505") {
    return new AppError("Duplicate value. Please use a different one.", 400);
  }
  if (err.code === "23502") {
    return new AppError("Missing required field.", 400);
  }
  if (err.code === "23503") {
    return new AppError("Invalid foreign key reference.", 400);
  }
  if (err.code === "22P02") {
    return new AppError("Invalid input syntax.", 400);
  }
  return err; // fallback
}

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("🔴 ERROR:", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const errorController = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Handle known PostgreSQL errors
  if (err.code) {
    error = handlePostgresErrors(err);
  }

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else {
    console.log("hello from dev");
    sendErrorProd(error, res);
  }
};

module.exports = errorController;
