const express = require("express");
const countryController = require("../controllers/countryController");
const route = express.Router();
route.get("/", countryController.getAllCountries);
route.post("/", countryController.createCountry);
route.get("/:id", countryController.getCountry);
route.patch("/:id", countryController.updateCountry);
route.delete("/:id", countryController.deleteCountry);
module.exports = route;
