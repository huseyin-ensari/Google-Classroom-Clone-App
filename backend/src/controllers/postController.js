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
  req.file ? (newPost.file = req.file.filename) : null;
  await newPost.save();
  await classroom.posts.push(newPost._id);
  await classroom.save();
  return res.status(200).json({ success: true, data: newPost });
});

const deletePost = asyncHandler(async (req, res, next) => {
  const { classroomID, postID } = req.params;
  const classroom = await Classroom.findById(classroomID);
  const post = await Post.findById(postID);
  if (!classroom || !post) {
    return next(new CustomError("Classroom or post not found", 400));
  }
  if (req.user.id !== post.author.toString()) {
    return next(new CustomError("You are not authorized", 400));
  }
  classroom.posts.splice(classroom.posts.indexOf(postID), 1);
  await classroom.save();
  await post.remove();
  return res.status(200).json({ success: true });
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { postID } = req.params;
  const { title, content } = req.body;
  const post = await Post.findById(postID);
  title ? (post.title = title) : null;
  content ? (post.content = content) : null;
  req.file ? (post.file = req.file.filename) : null;
  if (!post) {
    return next(new CustomError("Post not found", 400));
  }
  if (req.user.id !== post.author.toString()) {
    return next(new CustomError("You are not authorized", 400));
  }
  post.save();

  return res.status(200).json({ success: true, data: post });
});

module.exports = {
  createPost,
  deletePost,
  updatePost,
};
