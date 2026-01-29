import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import { motion } from "framer-motion";
import "../styles/recipes.css";

const RecipeSuggestions = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");

  const handleGetRecommendations = async () => {
    if (!token) {
      setError("Please login to get AI suggestions.");
      return;
    }
    if (!availableIngredients.trim()) {
      setError("Add some ingredients first, e.g., tomato, onion, chicken.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const ingredientsArray = availableIngredients.split(",").map(i => i.trim()).filter(i => i);
      const API = import.meta.env.VITE_API_URL || "http://localhost:7000";
      const response = await api.post(
        `/api/v1/recipe/recommendations`,
        {
          userId: user?._id,
          availableIngredients: ingredientsArray,
          nutritionGoals: user?.nutritionGoals || { highProtein: false },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        setRecommendations(response.data.recommendations || []);
      } else {
        setError("No suggestions found. Try different ingredients.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to get recommendations. Please check your server.");
      }
      console.error("AI suggestions error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipes-page">
      <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
        <h1 style={{ marginBottom: "1rem" }}>AI Recipe Suggestions ✨</h1>
        <p style={{ color: "var(--text-light)", marginBottom: "2rem" }}>
          Tell us what's in your pantry, and we'll suggest what to cook!
        </p>

        <div className="card" style={{ marginBottom: "3rem", textAlign: "left" }}>
          <div className="form-group">
            <label className="form-label">Available Ingredients (comma-separated):</label>
            <input
              type="text"
              value={availableIngredients}
              onChange={(e) => setAvailableIngredients(e.target.value)}
              className="form-input"
              placeholder="e.g., tomato, onion, chicken"
            />
          </div>
          <button
            onClick={handleGetRecommendations}
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={loading}
          >
            {loading ? "Getting Recommendations..." : "Get AI Suggestions"}
          </button>
        </div>

        {error && <div className="error-state" style={{ marginBottom: "2rem" }}>{error}</div>}

        <div className="recipes-grid">
          {recommendations.map((recipe) => (
            <motion.div 
              key={recipe._id} 
              className="recipe-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img src={recipe.imgurl} alt={recipe.title} className="recipe-image" />
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                <span style={{ 
                  display: "inline-block", 
                  padding: "0.25rem 0.5rem", 
                  backgroundColor: "rgba(69, 123, 157, 0.1)", 
                  color: "var(--secondary)",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem"
                }}>
                  {recipe.category}
                </span>
                <p className="recipe-desc">{recipe.instr}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {recommendations.length === 0 && !loading && !error && (
          <div className="empty-state">Enter your ingredients above to get started.</div>
        )}
      </div>
    </div>
  );
};

export default RecipeSuggestions;
