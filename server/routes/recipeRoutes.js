const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controller/recipeCtrl");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/recipes",authMiddleware,createRecipe);
router.get("/getrecipes",authMiddleware,getAllRecipes);
router.get("/idrecipes/:id",authMiddleware,getRecipeById);
router.put("/updaterecipes/:id",authMiddleware,updateRecipe);
router.delete("/deleterecipes/:id",authMiddleware, deleteRecipe);

module.exports = router;
