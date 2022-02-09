const { sign } = require("jsonwebtoken");

const {
  SECRET_ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE,
  SECRET_REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRE,
} = process.env;

const createAccessToken = (userID) => {
  return sign({ userID }, SECRET_ACCESS_TOKEN, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });
};

const createRefreshToken = (userID) => {
  return sign({ userID }, SECRET_REFRESH_TOKEN, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });
};

const sendAccessToken = (req, res, accessToken) => {
  res.send({
    accessToken,
    email: req.body.email,
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie("refreshToken", token, {
    path: "/refresh-token",
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
