const router = require("express").Router();
const classroomController = require("../controllers/classroomController");
const inputValidator = require("../middlewares/inputValidations/inputValidations");
const { isAuth, isTeacher, isStudent } = require("../middlewares/auth/auth");

// /api/classroom

router.post(
  "/create",
  inputValidator.newClassroom(),
  isAuth,
  isTeacher,
  classroomController.createClassroom
);

router.post(
  "/join/:accesscode",
  isAuth,
  isStudent,
  classroomController.joinClassroom
);

router.get("/:classroomID", isAuth, classroomController.getClassroomInfo);

module.exports = router;