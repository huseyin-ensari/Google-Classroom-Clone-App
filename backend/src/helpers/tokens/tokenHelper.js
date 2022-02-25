const { sign } = require("jsonwebtoken");
const RefreshToken = require("../../models/RefreshToken");
const CustomError = require("../errors/CustomError");

const {
  SECRET_ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE,
  SECRET_REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRE,
} = process.env;

const createAccessToken = (user) => {
  const { _id, email, role } = user;
  payload = { _id, email, role };
  return sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });
};

const createRefreshToken = (user) => {
  const { _id, email, role } = user;
  payload = { _id, email, role };
  return sign(payload, SECRET_REFRESH_TOKEN, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });
};

const saveRefreshToken = async (userID, refreshToken) => {
  const isUserExist = await RefreshToken.findOne({ user: userID });
  if (isUserExist) {
    isUserExist.refreshToken = refreshToken;
    await isUserExist.save();
  } else {
    const newRefreshToken = await RefreshToken({});
    newRefreshToken.user = userID;
    newRefreshToken.refreshToken = refreshToken;
    await newRefreshToken.save();
  }
};

const deleteRefreshToken = async (userID) => {
  const result = await RefreshToken.findOneAndDelete({ user: userID });
  if (!result) return next(new CustomError("Refresh token is not found", 400));
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
};
