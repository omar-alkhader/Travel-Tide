const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const guideRoute = require("./routes/guideRoute");
const guide_daily_sites = require("./routes/guideDailySiteRoute");
const cityRoute = require("./routes/cityRoute");
const reviewRoute = require("./routes/reviewRoute");
const countryRoute = require("./routes/countryRoute");
const flightRoute = require("./routes/flightRoute");
const hotelRoute = require("./routes/hotelRoute");
const paymentRoute = require("./routes/paymentRoute");
const siteRoute = require("./routes/siteRoute");
const bookingRoute = require("./routes/bookingRoute");
const AppError = require("./utlis/AppError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // your React dev server
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/reviews", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/guides", guideRoute);
app.use("/api/guide-daily-sites", guide_daily_sites);
app.use("/api/flights", flightRoute);
app.use("/api/countries", countryRoute);
app.use("/api/cities", cityRoute);
app.use("/api/sites", siteRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/create-payment-intent", paymentRoute);
app.all("*", (req, res, next) => {
  next(new AppError(`invalid url ${req.originalUrl} on this server !`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
