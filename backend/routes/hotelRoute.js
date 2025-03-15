const hotelController = require("../controllers/hotelController");
const express = require("express");
const route = express.Router();
route.get("/", hotelController.getAllHotels);
route.post("/", hotelController.createHotel);
route.get("/:id", hotelController.getHotel);
route.get("/:city_id/hotels", hotelController.getHotelByCity);
module.exports = route;
