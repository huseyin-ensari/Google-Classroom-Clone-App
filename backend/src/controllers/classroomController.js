const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const Classroom = require("../models/Classroom");
const User = require("../models/User");

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

const getClassroomInfo = asyncHandler(async (req, res, next) => {
  const { classroomID } = req.params;
  const classroom = await Classroom.findById(classroomID);
  if (!classroom) return next(new CustomError("Classroom not found", 400));

  return res.status(200).json({
    data: classroom,
  });
});

const removeStudent = asyncHandler(async (req, res, next) => {
  // öğrenci ıd + sınıf ıd
  const { classroomID, studentID } = req.params;
  const classroom = await Classroom.findById(classroomID);
  if (!classroom) return next(new CustomError("Classroom not found", 400));
  if (classroom.teacher.toString() !== req.user.id) {
    return next(new CustomError("You are not authorized", 400));
  }

  classroom.students.splice(classroom.students.indexOf(studentID), 1);
  classroom.save();
  return res.status(200).json({ success: true });
});

const changeInformation = asyncHandler(async (req, res, next) => {
  const { classroomID } = req.params;
  const { title, subtitle } = req.body;
  const classroom = await Classroom.findByIdAndUpdate(
    classroomID,
    {
      title,
      subtitle,
    },
    { new: true }
  );
  if (!classroom) return next(new CustomError("Classroom not found", 400));
  if (classroom.teacher.toString() !== req.user.id) {
    return next(new CustomError("You are not authorized", 400));
  }
  return res.status(200).json({ success: true });
});

module.exports = {
  createClassroom,
  joinClassroom,
  getClassroomInfo,
  removeStudent,
  changeInformation,
};
