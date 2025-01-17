const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
