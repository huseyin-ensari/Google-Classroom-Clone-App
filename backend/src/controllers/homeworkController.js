const asyncHandler = require("express-async-handler");
const Homework = require("../models/Homework");
const Classroom = require("../models/Classroom");
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
    appointedStudents: classroom.students,
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

  await homework.appointedStudents.splice(
    homework.appointedStudents.indexOf(req.user.id),
    1
  );

  await homework.submitters.push(project._id);
  homework.save();
  return res.status(200).json({ success: true, data: homework });
});

const getHomework = asyncHandler(async (req, res, next) => {
  const { homeworkID } = req.params;
  const homework = await Homework.findById(homeworkID)
    .populate({
      path: "submitters",
      // populate: { path: "user", select: "-password" },
      populate: { path: "user", select: "name lastname" },
    })
    .populate({
      path: "appointedStudents",
      select: "name lastname",
    });
  return res.status(200).json({ success: true, homework });
});

const updateHomework = asyncHandler(async (req, res, next) => {
  const homework = req.homework;
  const { title, content, endTime, score } = req.body;
  title ? (homework.title = title) : null;
  content ? (homework.title = content) : null;
  endTime ? (homework.title = endTime) : null;
  homework.save();
  return res.status(200).json({ success: true, data: homework });
});

const rateProject = asyncHandler(async (req, res, next) => {
  const { projectID } = req.params;
  const { score } = req.body;
  if (score < 0 && score > 100) {
    return next(new CustomError("Score must be between 0 and 100", 400));
  }

  const project = await Project.findById(projectID);
  if (!project) return next(new CustomError("Project not found", 400));
  project.score = score;
  project.save();
  return res.status(200).json({ success: true, data: project });
});

module.exports = {
  addHomework,
  submitHomework,
  getHomework,
  updateHomework,
  rateProject,
};