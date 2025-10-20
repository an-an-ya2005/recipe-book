import React, { useState } from "react";
import axios from "axios";
import "../styles/ree.css"; // Make sure your CSS file is linked here

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
    <div>
      <h1 className="head">FOOD RECIPE APP 🍳</h1>

      {/* Search Bar */}
      <div className="searchBar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Dish"
        />
        <button onClick={searchRecipes} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="msg">
        {recipes.length === 0 && !loading && "Search your favorite recipes!"}
      </div>

      {/* Recipe Cards */}
      <div className="meals">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="mealImg">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>{recipe.strMeal}</p>
            <p style={{ color: "gray", fontSize: "14px" }}>
              {recipe.strArea} • {recipe.strCategory}
            </p>

            <button onClick={() => toggleRecipe(recipe.idMeal)}>
              {openRecipeId === recipe.idMeal ? "Hide Recipe" : "View Recipe"}
            </button>

            {/* Expanded Details */}
            {openRecipeId === recipe.idMeal && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  textAlign: "left",
                  backgroundColor: "#fff3e0",
                  borderRadius: "8px",
                }}
              >
                <p>
                  <strong>Instructions:</strong>{" "}
                  {recipe.strInstructions.substring(0, 150)}...
                </p>

                <p style={{ marginTop: "8px", fontWeight: "600" }}>
                  Ingredients:
                </p>
                <ul style={{ marginLeft: "20px", fontSize: "14px" }}>
                  {Array.from({ length: 5 }, (_, i) => i + 1)
                    .map((i) => recipe[`strIngredient${i}`])
                    .filter(Boolean)
                    .map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                </ul>

                {recipe.strYoutube && (
                  <p style={{ marginTop: "8px" }}>
                    <a
                      href={recipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "orangered",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      ▶ Watch on YouTube
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFinder;
