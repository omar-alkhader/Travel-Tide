const pool = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
const siteModel = require("../models/siteModel");
exports.getAllSites = catchAsync(async (req, res, next) => {
  const sites = await siteModel.findAllSites();
  res.status(200).json({
    status: "success",
    data: {
      sites,
    },
  });
});
exports.getSite = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!isFinite(id)) next(new AppError("please provide valid city id", 404));
  const site = await siteModel.findSiteById(id);
  res.status(200).json({
    status: "success",
    data: {
      site,
    },
  });
});
exports.updateSite = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates || Object.keys(updates).length == 0) {
    return next(new AppError("you didn't update anything", 400));
  }
  const validColumn = ["name", "photo", "city_id"];
  const filteredEntires = Object.entries(updates).filter(([col]) =>
    validColumn.includes(col)
  );
  if (filteredEntires.length == 0) {
    return next(new AppError("invalid column names", 400));
  }
  const updatedSite = await siteModel.findSiteByIdAndUpdate(id, updates);
  if (updatedSite.rowCount === 0) {
    return next(new AppError("user not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedSite,
    },
  });
});
exports.deleteSite = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedSite = await siteModel.findSiteByIdAndDelete(id);
  if (deletedSite.rowCount === 0) {
    return next(new AppError("Country not found", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      deletedSite,
    },
  });
});
exports.createSite = catchAsync(async (req, res, next) => {
  const { name, city_id } = req.body;
  if (!name || !city_id) {
    return next(new AppError("please provide name and photo and city", 400));
  }
  const site = await siteModel.insertSite(req.body);
  res.status(200).json({
    status: "success",
    data: {
      site,
    },
  });
});
exports.getSitesByCity = catchAsync(async (req, res, next) => {
  const { city_id } = req.params;
  const sites = await siteModel.findSiteByCity(city_id);
  res.status(200).json({
    status: "success",
    data: {
      sites,
    },
  });
});
