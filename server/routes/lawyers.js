const express = require("express");
const router = express.Router();
const Lawyer = require("../models/Lawyer");

// Get all lawyers
router.get("/", async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Filter by category
router.get("/:category", async (req, res) => {
  try {
    const lawyers = await Lawyer.find({ category: req.params.category });
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;