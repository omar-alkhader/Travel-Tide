const express = require("express");
const route = express.Router();
const authController = require("../controllers/authUsers");
const reviewController = require("../controllers/reviewController");
route.get("/", authController.isLoggedIn);
route.post("/", reviewController.createReview);
route.get("/me", reviewController.getReviewById);

module.exports = route;
