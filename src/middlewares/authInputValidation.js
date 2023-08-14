const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.validateRegisterInput = () => {
  return [
    body("username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Username is empty")
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 characters")
      .custom(async (value) => {
        const existingUser = await User.findOne({ username: value });
        if (existingUser) {
          throw new Error("Username is already used");
        }
        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage("Password is empty")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is empty")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Confirm Password does not match");
        }
        return true;
      }),
  ];
};

exports.validateLoginInput = () => {
  return [
    body("username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Username is empty"),
    body("password")
      .notEmpty()
      .withMessage("Password is empty")
      .custom(async (value, { req }) => {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(value, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
      }),
  ];
};
