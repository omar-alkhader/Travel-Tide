const pool = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
const cityModel = require("../models/CityModel");
exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await cityModel.findAllCities();
  res.status(200).json({
    status: "success",
    data: {
      cities,
    },
  });
});
exports.getCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!isFinite(id)) next(new AppError("please provide valid city id", 404));
  const city = await cityModel.findCityById(id);
  res.status(200).json({
    status: "success",
    data: {
      city,
    },
  });
});
exports.updateCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates || Object.keys(updates).length == 0) {
    return next(new AppError("you didn't update anything", 400));
  }
  const validColumn = ["name", "photo", "country_id"];
  const filteredEntires = Object.entries(updates).filter(([col]) =>
    validColumn.includes(col)
  );
  if (filteredEntires.length == 0) {
    return next(new AppError("invalid column names", 400));
  }
  const updatedCity = await cityModel.findCityByIdAndUpdate(id, updates);
  if (updatedCity.rowCount === 0) {
    return next(new AppError("user not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedCity,
    },
  });
});
exports.deleteCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedCity = await cityModel.findCityByIdAndDelete(id);
  if (deletedCountry.rowCount === 0) {
    return next(new AppError("Country not found", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      deletedCity,
    },
  });
});
exports.createCity = catchAsync(async (req, res, next) => {
  const { name, photo, country_id } = req.body;
  if (!name || !photo || !country_id) {
    return next(new AppError("please provide name and photo and country", 400));
  }
  const city = await cityModel.insertCity(req.body);
  res.status(200).json({
    status: "success",
    data: {
      city,
    },
  });
});
exports.getCitiesByCountry = catchAsync(async (req, res, next) => {
  const { country_id } = req.params;
  const cities = await cityModel.findCityByCountry(country_id);
  res.status(200).json({
    status: "success",
    data: {
      cities,
    },
  });
});
