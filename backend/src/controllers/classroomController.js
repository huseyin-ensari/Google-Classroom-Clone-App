const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const Classroom = require("../models/Classroom");

const createClassroom = asyncHandler(async (req, res, next) => {
  const classroom = Classroom({ ...req.body, teacher: req.user.id });
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

const joinClassroom = asyncHandler(async (req, res, next) => {
  const accessCode = req.params.accesscode;
  const classroom = await Classroom.findOne({ accessCode });
  if (!classroom) return next(new CustomError("Classroom not found", 400));

  classroom.students.push(req.user.id);
  await classroom.save();
  return res.status(200).json({
    success: true,
  });
});

module.exports = {
  createClassroom,
  joinClassroom,
};
