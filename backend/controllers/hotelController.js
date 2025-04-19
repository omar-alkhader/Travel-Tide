const db = require("../db");
const hotelModel = require("../models/hotelModel");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
exports.getAllHotels = catchAsync(async (req, res, next) => {
  const hotels = hotelModel.findAllHotels();
  res.status(200).json({
    status: "success",
    data: {
      hotels,
    },
  });
});
exports.createHotel = catchAsync(async (req, res, next) => {
  const hotel = await hotelModel.createHotel(req.body);
  res.status(201).json({
    status: "success",
    data: {
      hotel,
    },
  });
});
exports.getHotel = catchAsync(async (req, res, next) => {
  if (!req.params.cityName) {
    return next(new AppError("pleave provide valid id"), 404);
  }

  const hotel = await hotelModel.getHotel(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      hotel,
    },
  });
});
exports.getHotelByCity = catchAsync(async (req, res, next) => {
  const { cityName } = req.params;
  if (!cityName) {
    return next(new AppError("pleave provide valid city_id"), 404);
  }
  const cityResult = await db.query(`SELECT id FROM city WHERE name = $1`, [
    cityName,
  ]);
  if (cityResult.rows.length === 0) {
    return next(new AppError("City not found", 404));
  }
  const cityId = cityResult.rows[0].id;
  const hotels = await hotelModel.getHotelsByCity(cityId);
  res.status(200).json({
    status: "success",
    data: {
      hotels,
    },
  });
});
