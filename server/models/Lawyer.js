const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  price: { type: String, required: true },
  online: { type: Boolean, default: false },
  initials: { type: String },
  category: { type: String },
  languages: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Lawyer", LawyerSchema);