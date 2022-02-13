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

router.patch(
  "/:classroomID/:studentID",
  isAuth,
  isTeacher,
  classroomController.removeStudent
);

router.patch(
  "/:classroomID",
  isAuth,
  isTeacher,
  classroomController.changeInformation
);

router.delete(
  "/:classroomID",
  isAuth,
  isTeacher,
  classroomController.deleteClassroom
);

module.exports = router;
