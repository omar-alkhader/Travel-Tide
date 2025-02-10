const express = require("express");
const userRoute = require("./routes/userRoute");
const countryRoute = require("./routes/countryRoute");
const app = express();
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/countries", countryRoute);
module.exports = app;
