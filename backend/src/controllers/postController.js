const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const Post = require("../models/Post");
const Classroom = require("../models/Classroom");

const createPost = asyncHandler(async (req, res, next) => {
  const { classroomID } = req.params;
  const { title, content } = req.body;
  const classroom = await Classroom.findById(classroomID);
  if (!classroom) return next(new CustomError("Classroom not found", 400));
  const newPost = await Post({ title, content });
  newPost.author = req.user.id;
  newPost.file = req.file.filename;
  await newPost.save();
  await classroom.posts.push(newPost._id);
  await classroom.save();
  return res.status(200).json({ success: true, data: newPost });
});

module.exports = {
  createPost,
};
