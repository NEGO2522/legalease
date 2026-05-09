const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ─── Models ───────────────────────────────────────────────────────────────────

const LegalData = mongoose.model(
  "LegalData",
  new mongoose.Schema({
    act: String,
    section: String,
    title: String,
    keywords: [String],
    summary: String,
    punishment: String,
    category: String,
  })
);

const LegalStats = mongoose.model(
  "LegalStats",
  new mongoose.Schema({
    category: String,
    data: mongoose.Schema.Types.Mixed,
    source: String,
    year: String,
  })
);

// ─── Keyword extractor ────────────────────────────────────────────────────────

function extractKeywords(question) {
  const stopWords = new Set([
    "kya", "hai", "mera", "meri", "mere", "ko", "ne", "ka", "ki", "ke",
    "the", "is", "a", "an", "of", "in", "on", "to", "for", "my", "me",
    "what", "how", "can", "i", "do", "did", "was", "are", "has",
  ]);
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
}

// ─── Stats keyword detector ───────────────────────────────────────────────────

function detectStatsIntent(question) {
  const q = question.toLowerCase();

  if (q.match(/foreign|abroad|jail|prison|country|deported/))
    return "indiansInForeignJails";

  if (q.match(/budget|gia|nalsa|fund|grant|allocat/))
    return "giaBudget";

  if (q.match(/state|rajasthan|karnataka|maharashtra|delhi|gujarat|bihar|statewise/))
    return "stateWiseLegalAid";

  if (q.match(/district|bangalore|jaipur|beneficiar|sc|st|women|children|custody/))
    return "districtBeneficiaries";

  return null;
}

// ─── POST /api/askai ──────────────────────────────────────────────────────────

router.post("/", async (req, res) => {
  try {
    const { question, language = "English" } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const keywords = extractKeywords(question);
    const statsCategory = detectStatsIntent(question);

    // ── 1. Search legalData (laws/acts) ──
    const lawResults = await LegalData.find({
      keywords: { $in: keywords },
    }).limit(5).lean();

    // ── 2. Search legalStats if stats-related question ──
    let statsResults = [];
    let statsSource = "";
    if (statsCategory) {
      const statsDocs = await LegalStats.find({ category: statsCategory }).limit(10).lean();
      statsResults = statsDocs.map(d => d.data);
      statsSource = statsDocs[0]?.source || "";
    }

    // ── 3. Build response ──
    if (lawResults.length === 0 && statsResults.length === 0) {
      return res.json({
        found: false,
        message:
          language === "Hindi"
            ? "Maafi chahta hoon, is sawaal ka jawab mere paas abhi nahi hai. Kisi vakeel se salah lein."
            : "Sorry, I couldn't find relevant legal information. Please consult a lawyer.",
        results: [],
        stats: [],
      });
    }

    res.json({
      found: true,
      question,
      keywords,
      results: lawResults.map(r => ({
        act: r.act,
        section: r.section,
        title: r.title,
        summary: r.summary,
        punishment: r.punishment,
        category: r.category,
      })),
      stats: statsResults,
      statsCategory,
      statsSource,
    });
  } catch (err) {
    console.error("AskAI error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ─── GET /api/askai/stats/:category ──────────────────────────────────────────

router.get("/stats/:category", async (req, res) => {
  try {
    const docs = await LegalStats.find({ category: req.params.category }).lean();
    res.json({ success: true, data: docs.map(d => d.data) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;