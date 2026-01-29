import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/recipes.css"; // Reuse recipes grid styles

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const toggleRecipe = (id) => {
    setOpenRecipeId(openRecipeId === id ? null : id);
  };

  return (
    <div className="recipes-page">
      <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
        <h1 style={{ marginBottom: "2rem" }}>Find Recipes Online 🔍</h1>

        {/* Search Bar */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "3rem" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a dish (e.g., Pasta, Curry)"
            className="form-input"
            style={{ flex: 1 }}
          />
          <button 
            onClick={searchRecipes} 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {recipes.length === 0 && !loading && (
          <div className="empty-state">Enter a dish name above to find global recipes!</div>
        )}

        {/* Recipe Cards */}
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <motion.div 
              key={recipe.idMeal} 
              className="recipe-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.strMeal}</h3>
                <p style={{ color: "var(--text-light)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  {recipe.strArea} • {recipe.strCategory}
                </p>

                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => toggleRecipe(recipe.idMeal)}
                  style={{ width: "100%" }}
                >
                  {openRecipeId === recipe.idMeal ? "Hide Details" : "View Recipe"}
                </button>

                {/* Expanded Details */}
                {openRecipeId === recipe.idMeal && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    style={{
                      marginTop: "1.5rem",
                      paddingTop: "1.5rem",
                      borderTop: "1px solid #e5e7eb",
                      textAlign: "left",
                    }}
                  >
                    <p style={{ fontSize: "0.9rem", color: "var(--text)", marginBottom: "1rem" }}>
                      <strong>Instructions:</strong><br/>
                      {recipe.strInstructions.substring(0, 200)}...
                    </p>

                    <p style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                      Ingredients:
                    </p>
                    <ul style={{ paddingLeft: "1.25rem", fontSize: "0.875rem", color: "var(--text-light)" }}>
                      {Array.from({ length: 8 }, (_, i) => i + 1)
                        .map((i) => recipe[`strIngredient${i}`])
                        .filter(Boolean)
                        .map((ingredient, i) => (
                          <li key={i}>{ingredient}</li>
                        ))}
                    </ul>

                    {recipe.strYoutube && (
                      <div style={{ marginTop: "1rem" }}>
                        <a
                          href={recipe.strYoutube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ color: "#e63946", borderColor: "#e63946", width: "100%", display: "block", textAlign: "center" }}
                        >
                          Watch Video Tutorial
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeFinder;