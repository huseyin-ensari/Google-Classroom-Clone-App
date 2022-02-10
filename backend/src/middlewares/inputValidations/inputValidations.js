const { body } = require("express-validator");
const User = require("../../models/User");
const CustomError = require("../../helpers/errors/CustomError");

const newUser = () => {
  return [
    body("name", "Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be minumum 2 character")
      .exists()
      .trim(),
    body("lastname", "Lastname is required")
      .isLength({ min: 2 })
      .exists()
      .trim(),
    body("role", "Role is required").exists(),
    body("email", "Email is required").isEmail().exists().trim(),
    body("password", "Password is require")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character")
      .exists(),
  ];
};

const newClassroom = () => {
  return [
    body("title", "Title is require").exists().isLength({ min: 4 }).trim(),
    body("subtitle").trim(),
  ];
};

/*
title
subtitle
*/

module.exports = {
  newUser,
  newClassroom,
};
