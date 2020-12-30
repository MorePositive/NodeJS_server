const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const person = await User.findOne({ email });

    if (person) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPass });

    await user.save();
    res.status(201).json({ message: "User registered" });
  }
  catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" })
  }
});

// /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User did not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { userId: user.id },
      config.get("jwtSecret"),
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user.id });
  }
  catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" })
  }
});

module.exports = router;
