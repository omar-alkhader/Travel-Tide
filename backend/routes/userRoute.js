const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const route = express.Router();
route.get("/", userController.getAllUsers);
route.post("/signup", authController.signup);
route.post("/login", authController.login);
module.exports = route;
