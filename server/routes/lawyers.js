const express = require("express");
const router = express.Router();
const Lawyer = require("../models/Lawyer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET all lawyers
router.get("/", async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET filter by category
router.get("/category/:category", async (req, res) => {
  try {
    const lawyers = await Lawyer.find({ category: req.params.category });
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST connect with lawyer — lawyersConnected +1
router.post("/connect/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { $inc: { lawyersConnected: 1 } });
    res.json({ message: "Connected!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;