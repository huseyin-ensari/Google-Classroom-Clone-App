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
    body("role", "Role is required").custom((value) => {
      if (value === "student" || value === "teacher") {
        return true;
      }
      return new CustomError("Please provide a correct role", 400);
    }),
    body("email", "Email is required")
      .isEmail()
      .exists()
      .trim()
      .custom((value) => {
        User.findOne({ email: value }).then((tempUser) => {
          if (tempUser) {
            throw new CustomError("Email already exist", 400);
          }
        });
        return true;
      }),
    body("password", "Password is require")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character")
      .exists(),
  ];
};

module.exports = {
  newUser,
};
