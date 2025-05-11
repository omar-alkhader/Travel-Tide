const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
const cityModel = require("../models/CityModel");
const db = require("../db");

const BASE_URL = process.env.BASE_URL || "http://localhost:6600/images/cities/";

const processPhotoUrl = (city, country) => {
  if (!city || !city.photo) return city;
  return {
    ...city,
    photo: `${BASE_URL}/${country.toLowerCase()}/${city.photo}`, // Replace photo with the full URL
  };
};

// Get all cities
exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await cityModel.findAllCities();
  if (!cities.length) {
    return next(new AppError("No cities found for the specified country", 404));
  }

  const processedCities = cities.map(processPhotoUrl); // Process all cities
  res.status(200).json({
    status: "success",
    data: {
      cities: processedCities,
    },
  });
});

// Get a single city
exports.getCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!isFinite(id))
    return next(new AppError("Please provide a valid city ID", 404));

  const city = await cityModel.findCityById(id);

  if (!city) return next(new AppError("City not found", 404));

  const processedCity = processPhotoUrl(city); // Process the photo URL
  res.status(200).json({
    status: "success",
    data: {
      city: processedCity,
    },
  });
});

// Update a city
exports.updateCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return next(new AppError("You didn't update anything", 400));
  }

  const validColumns = ["name", "photo", "country_id"];
  const filteredEntries = Object.entries(updates).filter(([col]) =>
    validColumns.includes(col)
  );
  if (filteredEntries.length === 0) {
    return next(new AppError("Invalid column names", 400));
  }

  const validUpdates = Object.fromEntries(filteredEntries);

  const updatedCity = await cityModel.findCityByIdAndUpdate(id, validUpdates);
  if (!updatedCity) {
    return next(new AppError("City not found", 404));
  }

  const processedCity = processPhotoUrl(updatedCity); // Process the updated city
  res.status(200).json({
    status: "success",
    data: {
      city: processedCity,
    },
  });
});

// Delete a city
exports.deleteCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedCity = await cityModel.findCityByIdAndDelete(id);

  if (!deletedCity) {
    return next(new AppError("City not found", 404));
  }

  const processedCity = processPhotoUrl(deletedCity); // Process the deleted city
  res.status(200).json({
    status: "success",
    data: {
      city: processedCity,
    },
  });
});

// Create a new city
exports.createCity = catchAsync(async (req, res, next) => {
  const { name, photo, country_id } = req.body;

  if (!name || !photo || !country_id) {
    return next(
      new AppError("Please provide name, photo, and country ID", 400)
    );
  }

  const newCity = await cityModel.insertCity(req.body);

  const processedCity = processPhotoUrl(newCity); // Process the created city
  res.status(200).json({
    status: "success",
    data: {
      city: processedCity,
    },
  });
});

exports.getCitiesByCountry = catchAsync(async (req, res, next) => {
  const { country_id } = req.params;
  if (!country_id) {
    return next(new AppError("pleave provide country id", 404));
  }
  const country = await db.query(`SELECT name FROM country WHERE id = $1`, [
    country_id,
  ]);
  console.log(country.rows[0].name);
  const cities = await cityModel.findCityByCountry(country_id);
  const processedCities = cities.map((city) =>
    processPhotoUrl(city, country?.rows?.[0]?.name)
  ); // Process all cities

  if (!cities.length) {
    console.log("hello");
    return next(new AppError("No cities found for the specified country", 404));
  }

  res.status(200).json({ status: "success", cities: processedCities });
});
