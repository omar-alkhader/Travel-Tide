const express = require("express");
const bookingController = require("../controllers/bookingController");
const route = express.Router();

// Create a new booking
route.post("/", bookingController.createBooking);
route.get("/user/:tourist_id", bookingController.getLatestBookingForUser);

// Confirm a booking (update status to 'confirmed')
route.patch("/confirm/:id", bookingController.confirmBooking);

// Delete a booking (and handle guide/traveller rollback if needed)
route.delete("/:id", bookingController.deleteBooking);

module.exports = route;
