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
  if (!req.params.id) {
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
  if (!req.params.city_id) {
    return next(new AppError("pleave provide valid city_id"), 404);
  }
  const hotels = await hotelModel.getHotelsByCity(req.params.city_id);
  res.status(200).json({
    status: "success",
    data: {
      hotels,
    },
  });
});
