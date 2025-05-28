const reviewModel = require("../models/reviewModel");
const AppError = require("../utlis/AppError");
const db = require("../db");
const catchAsync = require("../utlis/catchAsync");
exports.createReview = catchAsync(async (req, res, next) => {
  const { rating, comment, id } = req.body;
  if (!id) {
    return next(new AppError("you are not logged in please log in", 401));
  }
  const bookings = await db.query(
    `SELECT * FROM booking WHERE tourist_id = $1`,
    [id]
  );
  if (bookings.rows.length === 0) {
    return next(
      new AppError("You must have a booking to submit a review", 403)
    );
  }
  if (!rating || !comment)
    return next(new AppError("please provide rating and comment", 400));
  const review = await reviewModel.createReview(rating, comment, id);
  res.status(200).json({
    status: "success",
    review,
  });
});
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await reviewModel.getAllReview();
  res.status(200).json({
    status: "success",
    reviews,
  });
});
exports.getReviewById = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  console.log(id);
  if (!isFinite(id)) {
    next(new AppError("please provide valid id", 400));
  }

  const review = await reviewModel.getReviewById(id);
  if (!review) {
    return res.status(200).json({
      status: "success",
      review: null,
    });
  }
  res.status(200).json({
    status: "success",
    review,
  });
});
