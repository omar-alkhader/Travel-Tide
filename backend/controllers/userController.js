const validate = require("email-validator");
const userModel = require("../models/userModel");
exports.getAllUsers = async (req, res, next) => {
  const users = await userModel.findAllUsers();
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
