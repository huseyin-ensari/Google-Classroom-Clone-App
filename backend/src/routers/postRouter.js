const router = require("express").Router();
const inputValidator = require("../middlewares/inputValidations/inputValidations");
const { isAuth } = require("../middlewares/auth/auth");
const postController = require("../controllers/postController");
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
  postController.createPost
);

router.delete(
  "/:classroomID/:postID",
  isAuth,
  classroomCheck,
  postCheck,
  postController.deletePost
);

router.patch(
  "/:postID",
  isAuth,
  uploadFile.single("post_file"),
  postCheck,
  postController.updatePost
);

module.exports = router;
