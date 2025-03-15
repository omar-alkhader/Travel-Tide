const express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");
route.get("/", authController.isLoggedIn);
route.post("/", authController.isLoggedIn, reviewController.createReview);
route.get("/:id", authController.isLoggedIn, reviewController.getReviewById);

module.exports = route;
