require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// ✅ FIXED CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:7000",
    "https://your-frontend.netlify.app"
  ],
  credentials: true,
}));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
