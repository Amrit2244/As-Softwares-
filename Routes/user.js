// Routes/user.js
const express = require('express');
const router = express.Router();  // Initialize the router
const User = require('../models/User');  // Import the User model
const bcrypt = require('bcrypt');

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
