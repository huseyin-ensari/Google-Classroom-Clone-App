const router = require("express").Router();
const userController = require("../controllers/userController");
const inputValidator = require("../middlewares/inputValidations/inputValidations");
const { isAuth } = require("../middlewares/auth/auth");

// /api/users

router.post("/register", inputValidator.newUser(), userController.register);
router.post("/login", userController.login);
router.get("/logout/:userID", userController.logout);
router.post("/refreshtoken", userController.refreshToken);
router.patch("/:userID", isAuth, userController.changeInformation);
router.get("/loggedUser", isAuth, userController.getUserInformation);

module.exports = router;
