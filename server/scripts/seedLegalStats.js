require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// ─── Schema ───────────────────────────────────────────────────────────────────

const legalStatsSchema = new mongoose.Schema({
  category: String,       // 'stateWiseLegalAid' | 'indiansInForeignJails' | 'giaBudget' | 'districtBeneficiaries'
  data: mongoose.Schema.Types.Mixed,
  source: String,
  year: String,
}, { timestamps: true });

const LegalStats = mongoose.model("LegalStats", legalStatsSchema);

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  const uri = process.env.MONGO_URI;
  if (!uri) { console.error("❌ MONGO_URI not found in .env"); process.exit(1); }

  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");

  await LegalStats.deleteMany({});
  console.log("🗑️  Old stats cleared");

  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/legalStats.json"), "utf-8"));

  const docs = [];

  // 1. State-wise legal aid persons
  for (const entry of raw.stateWiseLegalAid) {
    docs.push({
      category: "stateWiseLegalAid",
      data: entry,
      source: "Rajya Sabha — Ministry of Law & Justice",
      year: "2006-2015",
    });
  }

  // 2. Indians in foreign jails
  for (const entry of raw.indiansInForeignJails) {
    docs.push({
      category: "indiansInForeignJails",
      data: entry,
      source: "Rajya Sabha — Ministry of External Affairs (as on 30.06.2021)",
      year: "2021",
    });
  }

  // 3. GIA Budget
  for (const entry of raw.giaBudget) {
    docs.push({
      category: "giaBudget",
      data: entry,
      source: "Rajya Sabha — NALSA GIA Allocation",
      year: entry.year,
    });
  }

  // 4. District beneficiaries
  for (const entry of raw.districtBeneficiaries) {
    docs.push({
      category: "districtBeneficiaries",
      data: entry,
      source: "Law and Justice Department, Karnataka",
      year: "2023-24",
    });
  }

  await LegalStats.insertMany(docs);
  console.log(`✅ ${docs.length} legal stats entries inserted!`);
  console.log("🔌 Done! LegalStats collection ready.");
  await mongoose.disconnect();
}

seed().catch(err => { console.error("❌ Error:", err); process.exit(1); });