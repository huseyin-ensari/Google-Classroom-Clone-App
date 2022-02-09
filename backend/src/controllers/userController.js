const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const { validationResult } = require("express-validator");
const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return next(new CustomError("Email already use", 400));
  }

  const validationErrors = validationResult(req).array();

  if (validationErrors.length > 1) {
    return res.status(400).json({
      errors: validationErrors,
    });
  }

  const hashedPassword = await hash(password, 10);

  const newUser = User({ ...req.body, password: hashedPassword });

  return res.status(201).json({
    message: "User Created",
    user: newUser,
  });
});

module.exports = {
  register,
};
