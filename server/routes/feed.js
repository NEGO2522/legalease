const express = require("express");
const router = express.Router();
const FeedPost = require("../models/FeedPost");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await FeedPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create post
router.post("/", async (req, res) => {
  try {
    const post = await FeedPost.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;