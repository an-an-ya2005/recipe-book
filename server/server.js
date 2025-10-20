const express = require("express");
// const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes =require("./routes/userRoutes");
const recipeRoutes =require("./routes/recipeRoutes");
// const { fetchNutrition } = require('./services/nutrition');
// const mealPlan =require("./routes/mealPlan")
//dotenv config
dotenv.config();
// require('dotenv').config();


//mongodb connection
connectDB();

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));


//rest object
const app=express()
//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow DELETE
  credentials: true
}));
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);
// app.use("/api/v1/mealPlan", mealPlan);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow your frontend origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Add DELETE here
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


//port
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});