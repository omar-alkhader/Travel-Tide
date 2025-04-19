const hotelController = require("../controllers/hotelController");
const express = require("express");
const route = express.Router();
route.get("/", hotelController.getAllHotels);
route.post("/", hotelController.createHotel);
route.get("/:id", hotelController.getHotel);
route.get("/city/:cityName", hotelController.getHotelByCity);
module.exports = route;
