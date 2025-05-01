const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

// GET round-trip flights with filters
router.get("/roundtrips", flightController.searchRoundTripFlights);
router.get("/package-flight", flightController.getOneRoundTripFlight);
router.get("/:id", flightController.getFlightById);
router.put("/:id", flightController.updateFlight);
router.delete("/:id", flightController.deleteFlight);

module.exports = router;
