const router = require("express").Router();
const userController = require("../controllers/userController");
const inputValidator = require("../middlewares/inputValidations/inputValidations");

// /api/users

router.post("/register", inputValidator.newUser(), userController.register);
router.post("/login", userController.login);

module.exports = router;
