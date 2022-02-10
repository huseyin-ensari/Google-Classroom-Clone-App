const router = require("express").Router();
const classroomController = require("../controllers/classroomController");
const inputValidator = require("../middlewares/inputValidations/inputValidations");
const { isAuth, isTeacher } = require("../middlewares/auth/auth");
// /api/classroom

router.post(
  "/create",
  inputValidator.newClassroom(),
  isAuth,
  isTeacher,
  classroomController.createClassroom
);

module.exports = router;
