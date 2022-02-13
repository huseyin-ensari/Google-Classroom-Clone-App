const asyncHandler = require("express-async-handler");
const Homework = require("../models/Homework");
const Project = require("../models/Projects");
const CustomError = require("../helpers/errors/CustomError");

const addHomework = asyncHandler(async (req, res, next) => {
  const { title, content, endTime } = req.body;
  const classroom = req.classroom;
  const homework = await Homework({
    title,
    content,
    endTime,
    teacher: req.user.id,
  });
  homework.save();
  await classroom.homeworks.push(homework._id);
  await classroom.save();
  return res.status(200).json({ success: true, data: homework });
});

const submitHomework = asyncHandler(async (req, res, next) => {
  const homework = req.homework;

  const project = await Project({ user: req.user.id, file: req.file.filename });
  if (project.createdAt > homework.endTime) {
    return next(
      new CustomError("Sorry, the deadline for homework is late.", 400)
    );
  }

  await project.save();

  await homework.submitters.push(project._id);
  homework.save();
  return res.status(200).json({ success: true, data: homework });
});

const getHomework = asyncHandler(async (req, res, next) => {
  const { homeworkID } = req.params;
  const homework = await Homework.findById(homeworkID).populate({
    path: "submitters",
    // populate: { path: "user", select: "-password" },
    populate: { path: "user", select: "name lastname" },
  });
  return res.status(200).json({ success: true, homework });
});

module.exports = {
  addHomework,
  submitHomework,
  getHomework,
};
