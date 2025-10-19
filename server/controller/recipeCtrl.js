const recipeModel = require("../models/recipeModel");

// server/testNutrition.js
// const dotenv = require("dotenv");
// dotenv.config(); // Load .env variables
// const { fetchNutrition } = require("../services/nutrition");

// const testNutrition = async () => {
//   const ingredients = [
//     { name: "tomato", qty: "2" },
//     { name: "onion", qty: "1" },
//     { name: "olive oil", qty: "1 tbsp" }
//   ];

//   const nutritionData = await fetchNutrition(ingredients);

//   console.log("Nutrition data fetched successfully:");
//   console.log(JSON.stringify(nutritionData, null, 2));
// };

// testNutrition();

// const { fetchNutrition } = require("../services/nutrition"); // Path relative to this file

// const testNutrition = async () => {
//   const ingredients = [
//     { name: "tomato", qty: "2" },
//     { name: "onion", qty: "1" },
//     { name: "olive oil", qty: "1 tbsp" }
//   ];

//   try {
//     const nutritionData = await fetchNutrition(ingredients);

//     console.log("Nutrition data fetched successfully:");
//     console.log(JSON.stringify(nutritionData, null, 2));
//   } catch (error) {
//     console.error("Error fetching nutrition:", error.message);
//   }
// };

// // Run the test directly
// testNutrition();

// Create a new recipe with nutrition info
// const recipeModel = require("../models/recipeModel");

// Create a new recipe without nutrition info
const createRecipe = async (req, res) => {
  try {
    const newRecipe = new recipeModel({
      ...req.body,
      // no nutrition field here
    });

    await newRecipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating recipe: ${error.message}`,
    });
  }
};

// Get all recipes (Supports category filtering)
const getAllRecipes = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category; // Filters recipes by category
    }

    const recipes = await recipeModel.find(query);
    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error fetching recipes: ${error.message}`,
    });
  }
};

// Get a single recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }
    res.status(200).json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error fetching recipe: ${error.message}` });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }
    res.status(200).json({ success: true, message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error updating recipe: ${error.message}` });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await recipeModel.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }
    res.status(200).json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error deleting recipe: ${error.message}` });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};

