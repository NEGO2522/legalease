const mongoose = require("mongoose");

const FeedPostSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  verified: { type: Boolean, default: false },
  reads: { type: Number, default: 0 },
  language: { type: String, default: "English" },
  tag: { type: String },
  url: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("FeedPost", FeedPostSchema);