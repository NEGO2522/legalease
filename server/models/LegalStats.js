const mongoose = require("mongoose");

const legalStatsSchema = new mongoose.Schema({
  category: String,
  data: mongoose.Schema.Types.Mixed,
  source: String,
  year: String,
}, { timestamps: true });

module.exports = mongoose.models.LegalStats || mongoose.model("LegalStats", legalStatsSchema);