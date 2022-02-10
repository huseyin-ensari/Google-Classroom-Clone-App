const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const { validationResult } = require("express-validator");
const { hash, compare } = require("bcrypt");
const { verify } = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../helpers/tokens/tokenHelper");

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

  const newUser = await User.create({ ...req.body, password: hashedPassword });

  return res.status(201).json({
    message: "User Created",
    user: newUser,
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return next(new CustomError("User not found", 400));
  const valid = await compare(password, user.password);
  if (!valid) return next(new CustomError("Password not correct", 400));

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.save();
  sendRefreshToken(res, refreshToken);
  sendAccessToken(req, res, accessToken);
});

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken", { path: "/refresh-token" });

  return res.status(200).json({
    success: true,
  });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.json({ accessToken: "" });
  let payload = verify(token, process.env.SECRET_REFRESH_TOKEN);
  if (!payload) return res.json({ accessToken: "" });

  let user = await User.findById(payload.userID);
  if (!user) return res.json({ accessToken: "" });
  if (user.refreshToken !== token) return res.json({ accessToken: "" });

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);
  user.refreshToken = refreshToken;
  user.save();
  sendRefreshToken(res, refreshToken);
  return res.status(200).json({ accessToken });
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
