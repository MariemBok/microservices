// routes/auth.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Registration endpoint
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newPassword = await hashPassword(password);

    const user = new User({ email, username, password: newPassword });
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("", async (req, res) => {
  return res.status(200).json({ message: "All users" });
});

module.exports = router;
