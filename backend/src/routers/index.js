const router = require("express").Router();
const userRouter = require("./userRouter");
const classroomRouter = require("./classroomRouter");
const postRouter = require("./postRouter");
const homeworkRouter = require("./homeworkRouter");

// /api
router.use("/users", userRouter);
router.use("/classroom", classroomRouter);
router.use("/posts", postRouter);
router.use("/homeworks", homeworkRouter);

module.exports = router;
