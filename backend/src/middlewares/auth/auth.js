const { verify } = require("jsonwebtoken");
const CustomError = require("../../helpers/errors/CustomError");

const isAuth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) return next(new CustomError("You need to login", 400));

  const token = authorization.split(" ")[1];
  const { _id, email, role } = verify(token, process.env.SECRET_ACCESS_TOKEN);
  req.user = {
    id: _id,
    email,
    role,
  };
  next();
};

const isTeacher = (req, res, next) => {
  if (req.user.role === "teacher") return next();
  return next(new CustomError("You are not authorized"));
};

const isStudent = (req, res, next) => {
  if (req.user.role === "student") return next();
  return next(new CustomError("You are not authorized"));
};

module.exports = {
  isAuth,
  isTeacher,
  isStudent,
};
