const router = require("express").Router();
const inputValidator = require("../middlewares/inputValidations/inputValidations");
const { isAuth } = require("../middlewares/auth/auth");
const postContoller = require("../controllers/postController");
const uploadFile = require("../middlewares/assets/uploadFile");

// /api/posts

router.post(
  "/:classroomID",
  isAuth,
  uploadFile.single("post_file"),
  postContoller.createPost
);

module.exports = router;
