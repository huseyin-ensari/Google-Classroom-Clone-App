const router = require("express").Router();
const userRouter = require("./userRouter");

// /api
router.use("/users", userRouter);

module.exports = router;
