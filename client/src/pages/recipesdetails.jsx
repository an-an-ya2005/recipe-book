import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import "../styles/recipes.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/api/v1/recipe/idrecipes/${id}`);
        const data = res.data;
        
        if (data?.success) {
          setRecipe(data.data);
        } else {
          setError("Failed to load recipe details");
        }
      } catch (err) {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="recipes-page">
        <div className="loading-state">Loading recipe details...</div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipes-page">
        <div className="error-state">
          {error || "Recipe not found"}
          <button 
            className="btn btn-primary" 
            style={{ marginTop: "1rem", display: "block", marginInline: "auto" }}
            onClick={() => navigate("/recipes")}
          >
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      <div className="recipe-details-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Recipes
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="recipe-hero">
            <img src={recipe.imgurl} alt={recipe.title} />
            <div className="recipe-hero-overlay">
              <h1 className="recipe-hero-title">{recipe.title}</h1>
              <p style={{ opacity: 0.9 }}>{recipe.category || "Delicious Recipe"}</p>
            </div>
          </div>

          {/* Info Card */}
          <div className="recipe-info-card">
            
            {/* Ingredients */}
            <div className="recipe-section">
              <h2 className="section-title">Ingredients</h2>
              <div className="ingredients-grid">
                {recipe.ingredients && recipe.ingredients.map((item, idx) => (
                  <div key={idx} className="ingredient-item">
                    <span className="ingredient-name">{item.name}</span>
                    <span className="ingredient-qty">{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="recipe-section">
              <h2 className="section-title">Instructions</h2>
              <p className="instructions-text">{recipe.instr}</p>
            </div>

            {/* Nutrition */}
            {recipe.nutrition && recipe.nutrition.length > 0 && (
              <div className="recipe-section">
                <h2 className="section-title">Nutrition Information</h2>
                <div className="nutrition-grid">
                  {recipe.nutrition.map((n, idx) => (
                    <div key={idx} className="nutrition-card">
                      <span className="nutrition-value">{n.calories || 0}</span>
                      <span className="nutrition-label">{n.name || "Calories"}</span>
                      {/* Assuming n might have other fields or structure, adapting to previous file's assumption */}
                      <div style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "#6b7280" }}>
                         {n.protein && <div>Protein: {n.protein}</div>}
                         {n.carbs && <div>Carbs: {n.carbs}</div>}
                         {n.fat && <div>Fat: {n.fat}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetails;
