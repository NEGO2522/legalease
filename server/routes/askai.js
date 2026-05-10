const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");

const LegalStats = mongoose.model(
  "LegalStats",
  new mongoose.Schema({
    category: String,
    data: mongoose.Schema.Types.Mixed,
    source: String,
    year: String,
  })
);

async function askGemini(question, language) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Gemini key found:", !!apiKey);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const systemPrompt = language === "Hindi"
      ? `Aap ek Indian legal assistant hain. User ke sawal ka jawab Hindi mein dijiye.
Sirf Indian law ke hisaab se jawab dijiye — IPC, CrPC, Consumer Protection Act, IT Act, etc.
Jawab mein yeh include karein:
1. Kaun sa kanoon apply hota hai (Act + Section)
2. User ke adhikar kya hain
3. Kya action le sakte hain
4. Punishment kya hai
Jawab concise aur clear rakhen. Maximum 300 words.
Disclaimer: Yeh sirf awareness ke liye hai, registered vakeel se salah zaroor len.`
      : `You are an Indian legal assistant. Answer based on Indian law only.
Include:
1. Which law applies (Act + Section number)
2. What are the user's rights
3. What action they can take
4. What is the punishment for the offender
Be concise and clear. Maximum 300 words.
Disclaimer: This is for awareness only. Please consult a registered lawyer.`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\nUser question: ${question}` }] }]
      })
    });

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data).slice(0, 200));
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error("Gemini error:", err.message);
    return null;
  }
}

function detectStatsIntent(question) {
  const q = question.toLowerCase();
  if (q.match(/foreign|abroad|jail|prison|country|deported/)) return "indiansInForeignJails";
  if (q.match(/budget|gia|nalsa|fund|grant|allocat/)) return "giaBudget";
  if (q.match(/state|rajasthan|karnataka|maharashtra|delhi|gujarat|bihar|statewise/)) return "stateWiseLegalAid";
  if (q.match(/district|bangalore|jaipur|beneficiar|sc|st|women|children|custody/)) return "districtBeneficiaries";
  return null;
}

router.post("/", async (req, res) => {
  try {
    const { question, language = "English", userId } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const statsCategory = detectStatsIntent(question);

    // Gemini se answer lo
    const aiAnswer = await askGemini(question, language);

    // Govt stats fetch karo
    let statsResults = [];
    let statsSource = "";
    if (statsCategory) {
      const statsDocs = await LegalStats.find({ category: statsCategory }).limit(10).lean();
      statsResults = statsDocs.map(d => d.data);
      statsSource = statsDocs[0]?.source || "";
    }

    // questionsAsked +1
    if (userId) {
      await User.findByIdAndUpdate(userId, { $inc: { questionsAsked: 1 } });
    }

    if (!aiAnswer && statsResults.length === 0) {
      return res.json({
        found: false,
        message: language === "Hindi"
          ? "Maafi chahta hoon, jawab nahi mila. Kisi vakeel se salah lein."
          : "Sorry, I couldn't find relevant legal information. Please consult a lawyer.",
        stats: [],
      });
    }

    res.json({
      found: true,
      question,
      aiAnswer,
      stats: statsResults,
      statsCategory,
      statsSource,
    });
  } catch (err) {
    console.error("AskAI error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.get("/stats/:category", async (req, res) => {
  try {
    const docs = await LegalStats.find({ category: req.params.category }).lean();
    res.json({ success: true, data: docs.map(d => d.data) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;