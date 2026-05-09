const express = require("express");
const router = express.Router();
const LegalStats = require("../models/LegalStats");

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const query = category === "all" ? {} : { category };
    const docs = await LegalStats.find(query).lean();

    if (category === "all") {
      const grouped = {};
      for (const doc of docs) {
        if (!grouped[doc.category]) grouped[doc.category] = [];
        grouped[doc.category].push(doc.data);
      }
      return res.json({ success: true, data: grouped });
    }

    res.json({ success: true, data: docs.map(d => d.data), source: docs[0]?.source });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/search/state", async (req, res) => {
  try {
    const { state } = req.query;
    const docs = await LegalStats.find({
      category: "stateWiseLegalAid",
      "data.state": { $regex: state, $options: "i" },
    }).lean();
    res.json({ success: true, data: docs.map(d => d.data) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;