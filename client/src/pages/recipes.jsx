import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import "../styles/recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  // Fetch recipes
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/v1/recipe/recipes`);
      const data = res.data;

      if (data?.success) {
        let fetchedRecipes = data.data || [];
        if (selectedCategory) {
          fetchedRecipes = fetchedRecipes.filter(
            (r) => r.category === selectedCategory
          );
        }
        setRecipes(fetchedRecipes);
        setError(null);
      } else {
        setError("Failed to fetch recipes");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [location.search]);

  // Delete recipe
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!window.confirm("Delete this recipe?")) return;

    try {
      const res = await api.delete(
        `/api/v1/recipe/deleterecipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setRecipes((prev) => prev.filter((r) => r._id !== id));
      }
    } catch {
      alert("Delete failed");
    }
  };

  const handleUpdate = (id, e) => {
    e.stopPropagation();
    navigate(`/updaterecipe/${id}`);
  };

  if (loading) return <div className="loading-state">Loading recipes...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="recipes-page">
      <div className="recipes-container">
        {recipes.length === 0 ? (
          <div className="empty-state">No recipes found. Why not add one?</div>
        ) : (
          <motion.div layout className="recipes-grid">
            <AnimatePresence>
              {recipes.map((recipe) => (
                <motion.div 
                  key={recipe._id} 
                  layout 
                  className="recipe-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => navigate(`/recipe/${recipe._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={recipe.imgurl} alt={recipe.title} className="recipe-image" />
                  <div className="recipe-content">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-desc">{recipe.instr}</p>
                    <div className="recipe-actions">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={(e) => handleUpdate(recipe._id, e)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => handleDelete(recipe._id, e)}
                        style={{ borderColor: '#ef4444', color: '#ef4444' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
