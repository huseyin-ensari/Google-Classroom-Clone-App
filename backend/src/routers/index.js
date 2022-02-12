const router = require("express").Router();
const userRouter = require("./userRouter");
const classroomRouter = require("./classroomRouter");
const postRouter = require("./postRouter");

// /api
router.use("/users", userRouter);
router.use("/classroom", classroomRouter);
router.use("/posts", postRouter);

module.exports = router;
