const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
const countryModel = require("../models/countryModel");

const BASE_URL =
  process.env.BASE_URL || "http://localhost:6600/images/countries/";

const processPhotoUrl = (country) => {
  if (!country || !country.photo) return country;
  return {
    ...country,
    photo: `${BASE_URL}${country.photo}`, // Replace photo with the full URL
  };
};

// Get all countries
exports.getAllCountries = catchAsync(async (req, res, next) => {
  const countries = await countryModel.findAllCountries();
  const processedCountries = countries.map(processPhotoUrl); // Process all countries
  res.status(200).json({
    status: "success",

    countries: processedCountries,
  });
});

// Get a single country
exports.getCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!isFinite(id))
    return next(new AppError("Please provide a valid country ID", 404));

  const country = await countryModel.findCountryById(id);

  if (!country) return next(new AppError("Country not found", 404));

  const processedCountry = processPhotoUrl(country); // Process the photo URL
  res.status(200).json({
    status: "success",
    country: processedCountry,
  });
});

// Update a country
exports.updateCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return next(new AppError("You didn't update anything", 400));
  }

  const validColumns = ["name", "photo"];
  const filteredEntries = Object.entries(updates).filter(([col]) =>
    validColumns.includes(col)
  );
  if (filteredEntries.length === 0) {
    return next(new AppError("Invalid column names", 400));
  }

  const validUpdates = Object.fromEntries(filteredEntries);

  const updatedCountry = await countryModel.findCountryByIdAndUpdate(
    id,
    validUpdates
  );
  if (!updatedCountry) {
    return next(new AppError("Country not found", 404));
  }

  const processedCountry = processPhotoUrl(updatedCountry); // Process the updated country
  res.status(200).json({
    status: "success",
    country: processedCountry,
  });
});

// Delete a country
exports.deleteCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedCountry = await countryModel.findCountryByIdAndDelete(id);

  if (!deletedCountry) {
    return next(new AppError("Country not found", 404));
  }

  const processedCountry = processPhotoUrl(deletedCountry); // Process the deleted country
  res.status(200).json({
    status: "success",
    country: processedCountry,
  });
});

// Create a new country
exports.createCountry = catchAsync(async (req, res, next) => {
  const { name, photo } = req.body;

  if (!name || !photo) {
    return next(new AppError("Please provide name and photo", 400));
  }

  const newCountry = await countryModel.insertCountry(req.body);

  const processedCountry = processPhotoUrl(newCountry); // Process the created country
  res.status(200).json({
    status: "success",
    data: {
      country: processedCountry,
    },
  });
});
