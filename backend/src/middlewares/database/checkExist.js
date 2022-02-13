const Post = require("../../models/Post");
const Classroom = require("../../models/Classroom");
const asyncHandler = require("express-async-handler");
const CustomError = require("../../helpers/errors/CustomError");

const postCheck = asyncHandler(async (req, res, next) => {
  const { postID } = req.params;
  const post = await Post.findById(postID);
  if (!post) return next(new CustomError("Post not found", 400));
  req.post = post;
  return next();
});

const classroomCheck = asyncHandler(async (req, res, next) => {
  const { classroomID } = req.params;
  const classroom = await Classroom.findById(classroomID);
  if (!classroom) return next(new CustomError("classroom not found", 400));
  req.classroom = classroom;
  return next();
});

module.exports = { postCheck, classroomCheck };
