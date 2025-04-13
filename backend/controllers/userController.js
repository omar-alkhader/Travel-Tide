const userModel = require("../models/userModel");
exports.getAllUsers = async (req, res, next) => {
  const users = (await userModel.findAllUsers()).rows;
  res.status(200).json({
    status: "success",
    data: {
      users: users,
    },
  });
};
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.getUser(id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates || Object.keys(updates).length == 0) {
    return next(new AppError("you didn't update anything", 400));
  }
  const validColumn = [
    "username",
    "email",
    "states",
    "city",
    "country",
    "phonenumber",
    "zipcode",
  ];
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
};
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await userModel.findUserByIdAndDelete(id);
  if (deletedUser.rowCount === 0) {
    return next(new AppError("user not found", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      deletedUser,
    },
  });
};
