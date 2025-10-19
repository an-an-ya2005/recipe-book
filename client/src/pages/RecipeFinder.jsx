import React, { useState } from "react";
import axios from "axios";

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔍 Search recipes from TheMealDB
  const searchRecipes = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error("Failed to fetch recipes", err);
    } finally {
      setLoading(false);
    }
  };

  // 👀 View full details of a recipe
  const viewRecipe = async (recipe) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
      );
      setSelectedRecipe(res.data.meals[0]);
    } catch (err) {
      console.error("Failed to load recipe details", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">
        🍳 Find Recipes
      </h2>

      <div className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a recipe..."
          className="input input-bordered w-full max-w-xs border-pink-400"
        />
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
          onClick={searchRecipes}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading recipes...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {recipe.strMeal}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {recipe.strArea} • {recipe.strCategory}
              </p>
              <button
                onClick={() => viewRecipe(recipe)}
                className="flex items-center justify-center gap-2 text-pink-600 font-medium border border-pink-400 py-2 rounded-lg w-full hover:bg-pink-50 transition-all duration-200"
              >
                🔍 View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🍴 Recipe Details Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-3 text-red-500 font-bold"
              onClick={() => setSelectedRecipe(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3 text-center text-pink-600">
              {selectedRecipe.strMeal}
            </h2>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="rounded mb-3"
            />
            <p>
              <strong>Category:</strong> {selectedRecipe.strCategory}
            </p>
            <p>
              <strong>Area:</strong> {selectedRecipe.strArea}
            </p>

            <h3 className="font-semibold mt-3 mb-1">Ingredients:</h3>
            <ul className="list-disc list-inside mb-3 text-sm">
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map((i) => ({
                  ingredient: selectedRecipe[`strIngredient${i}`],
                  measure: selectedRecipe[`strMeasure${i}`],
                }))
                .filter((item) => item.ingredient)
                .map((item, index) => (
                  <li key={index}>
                    {item.ingredient} — {item.measure}
                  </li>
                ))}
            </ul>

            <p className="text-sm text-justify">
              <strong>Instructions:</strong> {selectedRecipe.strInstructions}
            </p>

            <div className="mt-3 text-center">
              <a
                href={selectedRecipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:underline"
              >
                ▶ Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFinder;
