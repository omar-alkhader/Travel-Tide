const express = require("express");
const countryController = require("../controllers/countryController");
const route = express.Router();
route.get("/", countryController.getAllCountries);
