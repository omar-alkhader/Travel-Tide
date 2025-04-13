const pool = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
const countryModel = require("../models/countryModel");
exports.getAllCountries = catchAsync(async (req, res, next) => {
  const countries = await countryModel.findAllCountries();
  res.status(200).json({
    status: "success",
    data: {
      countries,
    },
  });
});
exports.getCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!isFinite(id)) next(new AppError("please provide valid city id", 404));
  const country = countryModel.findCountryById(id);
  res.status(200).json({
    status: "success",
    data: {
      country,
    },
  });
});
exports.updateCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates || Object.keys(updates).length == 0) {
    return next(new AppError("you didn't update anything", 400));
  }
  const validColumn = ["name", "photo"];
  const filteredEntires = Object.entries(updates).filter(([col]) =>
    validColumn.includes(col)
  );
  if (filteredEntires.length == 0) {
    return next(new AppError("invalid column names", 400));
  }
  const updatedUser = await countryModel.findCountryByIdAndUpdate(id, updates);
  if (updatedUser.rowCount === 0) {
    return next(new AppError("user not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
exports.deleteCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedCountry = await countryModel.findCountryByIdAndDelete(id);
  if (deletedCountry.rowCount === 0) {
    return next(new AppError("Country not found", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      deletedCountry,
    },
  });
});
exports.createCountry = catchAsync(async (req, res, next) => {
  const { name, photo } = req.body;
  if (!name || !photo) {
    return next(new AppError("please provide name and photo", 400));
  }
  const country = await countryModel.insertCountry(req.body);
  res.status(200).json({
    status: "success",
    data: {
      country,
    },
  });
});
