const recipeModel = require("../models/recipeModel");
const userModel = require("../models/userModels");

// ✅ CREATE RECIPE
const createRecipe = async (req, res) => {
  try {
    const recipe = new recipeModel({
      ...req.body,
      user: req.user._id,
    });
    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe created",
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Create recipe failed",
    });
  }
};

// ✅ GET ALL RECIPES
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.status(200).json({ success: true, data: recipes });
  } catch {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

// ✅ GET RECIPE BY ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: recipe });
  } catch {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

// ✅ UPDATE RECIPE
const updateRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated",
      data: recipe,
    });
  } catch {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// ✅ DELETE RECIPE
const deleteRecipe = async (req, res) => {
  try {
    await recipeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Delete error" });
  }
};

// ✅ RECOMMENDATIONS
const getRecommendations = async (req, res) => {
  try {
    const { userId, availableIngredients = [], nutritionGoals = {} } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false });

    const recipes = await recipeModel.find();

    const ranked = recipes.map((recipe) => {
      let score = 0;

      const ingredients =
        recipe.ingredients?.map((i) => i.name.toLowerCase()) || [];

      score += availableIngredients.filter((i) =>
        ingredients.includes(i.toLowerCase())
      ).length * 10;

      const nutrition = recipe.nutrition || [];

      if (
        nutritionGoals.highProtein &&
        nutrition.some((n) => n.name === "Protein" && n.amount > 20)
      ) {
        score += 15;
      }

      return { recipe, score };
    });

    ranked.sort((a, b) => b.score - a.score);

    res.json({
      success: true,
      recommendations: ranked.slice(0, 5).map((r) => r.recipe),
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecommendations,
};
