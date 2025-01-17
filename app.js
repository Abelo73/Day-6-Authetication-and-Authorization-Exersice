const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoutes");
const adminRoute = require("./routes/adminRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined");
  process.exit(1); // Exit if MongoDB URI is missing
}

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware and Routes
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);

// Example Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
