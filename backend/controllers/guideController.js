const validate = require("email-validator");
const guideModel = require("../models/guideModel");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utlis/catchAsync");
const AppError = require("../utlis/AppError");
exports.getAllGuides = async (req, res, next) => {
  const guides = await guideModel.findAllGuides();
  res.status(200).json({
    status: "success",
    data: {
      guides,
    },
  });
};
exports.getGuideById = async (req, res, next) => {
  const { id } = req.params;
  const guide = await guideModel.getGuide(id);
  res.status(200).json({
    status: "success",
    data: {
      guide,
    },
  });
};
exports.updateGuide = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates || Object.keys(updates).length == 0) {
    return next(new AppError("you didn't update anything", 400));
  }
  const validColumn = ["name", "email"];
  const filteredEntires = Object.entries(updates).filter(([col]) =>
    validColumn.includes(col)
  );
  if (filteredEntires.length == 0) {
    return next(new AppError("invalid column names", 400));
  }
  const updatedGuide = await guideModel.findByIdAndUpdate(id, updates);
  if (updatedGuide.rowCount === 0) {
    return next(new AppError("user not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedGuide,
    },
  });
});
exports.deleteGuide = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedGuide = await guideModel.findByIdAndDelete(id);
  if (deletedGuide.rowCount === 0) {
    return next(new AppError("guide not found", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      deletedGuide,
    },
  });
});
exports.insertGuide = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (!validate.validate(email)) {
    return next(new AppError("please provide validEmail"));
  }
  if (!password || !passwordConfirm) {
    return next(new AppError("please enter password and passwordConfirm", 400));
  }
  if (password !== passwordConfirm) {
    return next(
      new AppError("password and passwordConfirm are not equal", 400)
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const guide = await guideModel.createGuide({ name, email, hashedPassword });
  res.status(200).json({
    status: "success",
    guide,
  });
});
