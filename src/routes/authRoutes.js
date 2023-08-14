const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Import the authController
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middlewares/authInputValidation");

router.post("/login", validateLoginInput(), authController.login); // Use the login controller function
router.post("/register", validateRegisterInput(), authController.register); // Use the signup controller function

module.exports = router;
