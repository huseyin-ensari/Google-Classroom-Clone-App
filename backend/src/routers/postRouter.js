const router = require("express").Router();
const inputValidator = require("../middlewares/inputValidations/inputValidations");
const { isAuth } = require("../middlewares/auth/auth");
const postContoller = require("../controllers/postController");
const uploadFile = require("../middlewares/assets/uploadFile");
const {
  classroomCheck,
  postCheck,
} = require("../middlewares/database/checkExist");

// /api/posts

router.post(
  "/:classroomID",
  isAuth,
  uploadFile.single("post_file"),
  classroomCheck,
  postContoller.createPost
);

router.delete(
  "/:classroomID/:postID",
  isAuth,
  classroomCheck,
  postCheck,
  postContoller.deletePost
);

router.patch(
  "/:postID",
  isAuth,
  uploadFile.single("post_file"),
  postCheck,
  postContoller.updatePost
);

module.exports = router;
