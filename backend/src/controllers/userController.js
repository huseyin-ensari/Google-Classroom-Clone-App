const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Classroom = require("../models/Classroom");
const CustomError = require("../helpers/errors/CustomError");
const { validationResult } = require("express-validator");
const { hash, compare } = require("bcrypt");
const { verify } = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
} = require("../helpers/tokens/tokenHelper");
const RefreshToken = require("../models/RefreshToken");

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

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  user.save();
  await saveRefreshToken(user._id, refreshToken);
  return res.status(200).json({
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken,
  });
});

const logout = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  await deleteRefreshToken(userID);
  return res.status(200).json({
    success: true,
  });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const token = req.headers.refreshtoken;
  if (!token) return res.json({ accessToken: "" });
  let payload = verify(token, process.env.SECRET_REFRESH_TOKEN);
  if (!payload) return res.json({ accessToken: "" });
  let user = await User.findById(payload._id);
  if (!user) return res.json({ accessToken: "user not found" });
  const existingRefreshtoken = await RefreshToken.findOne({ user: user._id });
  if (existingRefreshtoken.refreshToken !== token) {
    return res.json({ accessToken: "token is not correct" });
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  await user.save();
  await saveRefreshToken(user._id, refreshToken);
  return res.status(200).json({ accessToken, refreshToken });
});

const changeInformation = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  const { name, lastname, email } = req.body;
  if (req.user.id !== userID) {
    return next(new CustomError("You are not authorized"));
  }
  const user = await User.findByIdAndUpdate(
    userID,
    { email, name, lastname },
    { new: true }
  );
  if (!user) return next(new CustomError("User not found", 400));

  return res.status(200).json({ data: user });
});

const getUserInformation = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return next(new CustomError("User not found", 400));
  const attended = await Classroom.find({
    students: user.id,
  })
    .select("title subtitle teacher")
    .populate({
      path: "teacher",
      select: "name lastname ",
    });

  const createdBy = await Classroom.find({
    teacher: user.id,
  })
    .select("title subtitle teacher")
    .populate({
      path: "teacher",
      select: "name lastname ",
    });
  const classrooms = [...createdBy, ...attended];
  return res.status(200).json({ user, classrooms });
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  changeInformation,
  getUserInformation,
};
