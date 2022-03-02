const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const Classroom = require("../models/Classroom");
const Post = require("../models/Post");
const path = require("path");

const createPost = asyncHandler(async (req, res, next) => {
  const { classroomID } = req.params;
  const { title, content } = req.body;
  const classroom = req.classroom;
  const newPost = await Post({ title, content });
  newPost.author = req.user.id;
  req.file ? (newPost.file = req.file.filename) : null;
  await newPost.save();
  await classroom.posts.push(newPost._id);
  await classroom.save();
  return res.status(200).json({ success: true, data: newPost });
});

const deletePost = asyncHandler(async (req, res, next) => {
  const classroom = req.classroom;
  const post = req.post;
  if (req.user.id !== post.author.toString()) {
    return next(new CustomError("You are not authorized", 400));
  }
  classroom.posts.splice(classroom.posts.indexOf(post._id), 1);
  await classroom.save();
  await post.remove();
  return res.status(200).json({ success: true });
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const post = req.post;
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

const getPostsByClassroom = asyncHandler(async (req, res, next) => {
  const posts = await Classroom.findById(req.classroom._id)
    .select("posts")
    .populate({
      path: "posts",
      select: "-__v",
      populate: { path: "author", select: "name lastname" },
    });
  return res.json({ posts });
});

const sendPostFile = asyncHandler(async (req, res, next) => {
  const appPath = path.resolve();
  const filePath = "/public/uploads/posts";
  const { filename } = req.params;
  const myPath = path.join(appPath, filePath, filename);
  return res.status(200).sendFile(myPath);
});

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getPostsByClassroom,
  sendPostFile,
};
