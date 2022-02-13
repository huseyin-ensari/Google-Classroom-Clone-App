const { sign } = require("jsonwebtoken");

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

const sendAccessToken = (req, res, accessToken, user) => {
  const { email, name, lastname, role } = user;
  res.send({
    accessToken,
    email,
    name,
    lastname,
    role,
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
