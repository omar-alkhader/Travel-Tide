const reviewModel = require("../models/reviewModel");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
exports.createReview = catchAsync(async (req, res, next) => {
  const { rating, description } = req.body;
  if (!rating || !description)
    throw new AppError("please provide rating and description", 400);
  const { id } = res.locals.user;
  const review = await reviewModel.createReview(rating, description, id);
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
  const { id } = req.params;
  if (!isFinite(id)) {
    next(new AppError("please provide valid id", 400));
  }
  const review = await reviewModel.getReviewById(id);
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
