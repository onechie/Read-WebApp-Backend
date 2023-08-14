const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult, matchedData } = require("express-validator");
const User = require("../models/User"); // Import the User model

const JWT_SECRET = "your-secret-key"; // Replace with your own secret key

exports.register = async (req, res) => {
  try {
    const result = validationResult(req);
    // check if result errors is empty
    if (result.isEmpty()) {
      const { username, password } = matchedData(req);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      return res.status(201).json({ message: "Registered successfully!" });
    }
    res.send({ message: result.errors[0].msg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = validationResult(req);
    // check if result errors is empty
    if (result.isEmpty()) {
      const { username } = matchedData(req);
      // Generate a JWT token
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({ message: "Login successful", token });
    }
    res.send({ message: result.errors[0].msg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
