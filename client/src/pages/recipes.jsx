import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import "../styles/ree.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  // Fetch all recipes
  const fetchRecipes = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/v1/recipe/recipes");
      const data = await res.json();

      if (res.ok && Array.isArray(data.recipes)) {
        let filteredRecipes = data.recipes;
        if (selectedCategory) {
          filteredRecipes = filteredRecipes.filter(
            (recipe) => recipe.category === selectedCategory
          );
        }
        setRecipes(filteredRecipes);
      } else {
        setError("Invalid data format from API");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [location.search]);

  // Delete recipe
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const res = await fetch(`http://localhost:7000/api/v1/recipe/deleterecipes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        alert("Recipe deleted successfully!");
        setRecipes(recipes.filter((r) => r._id !== id));
      } else {
        alert(data.message || "Failed to delete recipe.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting recipe.");
    }
  };

  // Navigate to update form
  const handleUpdate = (id) => {
    navigate(`/updaterecipe/${id}`);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Recipes</h2>

      {/* Filter Buttons */}
      <div className="filters">
        <Link to="/recipes"><button>All</button></Link>
        <Link to="/recipes?category=Breakfast"><button>Breakfast</button></Link>
        <Link to="/recipes?category=Lunch"><button>Lunch</button></Link>
        <Link to="/recipes?category=Dinner"><button>Dinner</button></Link>
      </div>

      {/* Recipes Grid */}
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipe-container">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <img src={recipe.imgurl} alt={recipe.title} width="100%" />
              <p>{recipe.instr}</p>
              <p><strong>Category:</strong> {recipe.category}</p>

              <div className="button-group">
                <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                <button onClick={() => handleUpdate(recipe._id)}>Update</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
