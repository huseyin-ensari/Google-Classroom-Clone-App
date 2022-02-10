const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const Classroom = require("../models/Classroom");

const createClassroom = asyncHandler(async (req, res, next) => {
  const classroom = Classroom({ ...req.body });
  classroom
    .save()
    .then((data) =>
      res.status(200).json({
        success: true,
        classroom: data,
      })
    )
    .catch((err) => next(new CustomError("Someting wrong", 400)));
});

module.exports = {
  createClassroom,
};
