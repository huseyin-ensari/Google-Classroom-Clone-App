const router = require("express").Router();
const userRouter = require("./userRouter");
const classroomRouter = require("./classroomRouter");

// /api
router.use("/users", userRouter);
router.use("/classroom", classroomRouter);

module.exports = router;
