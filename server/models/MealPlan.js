// models/MealPlan.js
const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weekStart: { type: Date, required: true },
  meals: {
    monday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
    tuesday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
    // repeat for all days...
  }
});

module.exports = mongoose.model("MealPlan", mealPlanSchema);
