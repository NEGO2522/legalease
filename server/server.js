const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/feed", require("./routes/feed"));
app.use("/api/lawyers", require("./routes/lawyers"));

app.get("/", (req, res) => {
  res.json({ message: "LegalEase Backend Running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});