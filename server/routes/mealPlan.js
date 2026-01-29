// // routes/mealPlan.js
// const express = require("express");
// const router = express.Router();
// const MealPlan = require("../models/MealPlan");

// // Create or update meal plan
// router.post("/", async (req, res) => {
//   try {
//     const { userId, weekStart, meals } = req.body;
//     const mealPlan = await MealPlan.findOneAndUpdate(
//       { userId, weekStart },
//       { meals },
//       { upsert: true, new: true }
//     );
//     res.json(mealPlan);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get meal plan for a user
// router.get("/:userId/:weekStart", async (req, res) => {
//   try {
//     const { userId, weekStart } = req.params;
//     const plan = await MealPlan.findOne({ userId, weekStart }).populate("meals.monday.breakfast meals.monday.lunch meals.monday.dinner");
//     res.json(plan);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
