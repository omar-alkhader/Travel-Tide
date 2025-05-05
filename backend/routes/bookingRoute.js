const express = require("express");
const bookingController = require("../controllers/bookingController");
const route = express.Router();
route.post("/", bookingController.createBooking);
module.exports = route;
