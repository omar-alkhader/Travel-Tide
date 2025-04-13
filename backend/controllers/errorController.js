const AppError = require("../utlis/AppError");

function hnaldeDuplicateKey(err) {
  return new AppError("duplicate please try another valie", 400);
}
const errorController = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "something went wrong";
  let error = Object.create(err);

  console.log(error.code);
  res.status(statusCode).json({
    status,
    message,
  });
};
module.exports = errorController;
/*
function handlePostgresErrors(err, req, res, next) {
  // Duplicate key value violates unique constraint
  if (err.code === '23505') {
    return res.status(400).json({
      status: 'fail',
      message: 'Duplicate value found. Please use a different value.'
    });
  }
  // Not-null violation
  if (err.code === '23502') {
    return res.status(400).json({
      status: 'fail',
      message: 'A required field is missing.'
    });
  }
  // Foreign key violation
  if (err.code === '23503') {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid reference. Please check your input.'
    });
  }
  // Pass along other errors
  next(err);
}

// Later, in your app setup (after all routes):
app.use(handlePostgresErrors);

*/
