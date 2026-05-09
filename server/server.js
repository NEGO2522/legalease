const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const figlet = require("figlet");
const chalk = require("chalk");
require("dotenv").config();

const app = express();

// Banner
console.log(
  chalk.yellow(
    figlet.textSync("LegalEase", {
      font: "Big",
      horizontalLayout: "default",
    })
  )
);
console.log(chalk.cyan("  ⚖️  AI Legal Assistant for Every Indian"));
console.log(chalk.magenta("  🌐 Hindi | English | Tamil | Telugu"));
console.log(chalk.gray("  👨‍💻 Built by Kshitij Jain — B.Tech CSE AI/ML 3rd Year"));
console.log(chalk.gray("  ─────────────────────────────────────────────\n"));

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(chalk.green("  ✅ MongoDB Connected!")))
  .catch((err) => console.log(chalk.red("  ❌ MongoDB Error:", err)));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/feed", require("./routes/feed"));
app.use("/api/lawyers", require("./routes/lawyers"));

app.get("/", (req, res) => {
  res.json({ message: "LegalEase Backend Running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.green(`\n  🚀 Server running on port ${PORT}`));
  console.log(chalk.gray(`  📡 API: http://localhost:${PORT}/api\n`));
});