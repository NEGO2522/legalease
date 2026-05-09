const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// server/scripts/ se ek upar jaao = server/.env
require("dotenv").config({ path: path.join(__dirname, "../.env") });

console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Not found");

const legalSchema = new mongoose.Schema({
  act: String,
  section: String,
  title: String,
  keywords: [String],
  summary: String,
  punishment: String,
  category: String,
});

const Legal = mongoose.models.Legal || mongoose.model("Legal", legalSchema);

const seed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("❌ MONGO_URI not found in .env");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");

    await Legal.deleteMany({});
    console.log("🗑️  Old data cleared");

    const dataPath = path.join(__dirname, "../data/legalData.json");
    if (!fs.existsSync(dataPath)) {
      console.error("❌ legalData.json not found at:", dataPath);
      console.error("💡 server/data/ folder mein legalData.json rakho");
      process.exit(1);
    }

    const raw = fs.readFileSync(dataPath, "utf-8");
    // JSON ke // comments hata do
    const cleaned = raw.replace(/\/\/.*$/gm, "").replace(/,(\s*[}\]])/g, "$1");
    const data = JSON.parse(cleaned);

    await Legal.insertMany(data);
    console.log(`✅ ${data.length} legal entries inserted successfully!`);

    await mongoose.disconnect();
    console.log("🔌 Done! Ab AskAI kaam karega.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seed();