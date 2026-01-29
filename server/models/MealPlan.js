// models/MealPlan.js
const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  weekStart: { type: Date, required: true },
  meals: {
    monday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
    tuesday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
    wednesday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
    thursday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
    friday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
    saturday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
    sunday: { breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" } },
  }
});

module.exports = mongoose.model("MealPlan", mealPlanSchema);
