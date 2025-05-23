const express = require("express");
const cityController = require("../controllers/cityController");
const route = express.Router();
route.get("/", cityController.getAllCities);
route.get("/country/:country_id", cityController.getCitiesByCountry);
route.post("/", cityController.createCity);
route.get("/:id", cityController.getCity);
route.patch("/:id", cityController.updateCity);
route.delete("/:id", cityController.deleteCity);
module.exports = route;
