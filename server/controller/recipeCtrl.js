const recipeModel = require("../models/recipeModel");

// Create a new recipe
const createRecipe = async (req, res) => {
    try {
      console.log("Received data:", req.body); // This will log the incoming data
      const newRecipe = new recipeModel(req.body);
      await newRecipe.save();
      res.status(201).send({
        success: true,
        message: "Recipe created successfully",
        recipe: newRecipe,
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).send({
        success: false,
        message: `Error creating recipe: ${error.message}`,
      });
    }
  };
  
  
  // Then update the POST endpoint to use this function:
//   app.post('/recipes', createRecipe);
  
// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    res.status(200).send({
      success: true,
      message: "Recipes fetched successfully",
      recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send({
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
      return res.status(404).send({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Recipe fetched successfully",
      recipe,
    });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).send({
      success: false,
      message: `Error fetching recipe: ${error.message}`,
    });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedRecipe) {
      return res.status(404).send({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).send({
      success: false,
      message: `Error updating recipe: ${error.message}`,
    });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await recipeModel.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).send({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Recipe deleted successfully",
      recipe: deletedRecipe,
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).send({
      success: false,
      message: `Error deleting recipe: ${error.message}`,
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
