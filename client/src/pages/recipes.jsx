import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import "../styles/ree.css"; // Ensure this path is correct

// ✅ Add `useLocation`

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  
  // ✅ Get category from URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    fetch("http://localhost:7000/api/v1/recipe/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // ✅ Debugging output

        if (Array.isArray(data.recipes)) {
          let filteredRecipes = data.recipes;

          if (selectedCategory) {
            filteredRecipes = filteredRecipes.filter(
              (recipe) => recipe.category === selectedCategory
            );
          }
          console.log("Selected Category:", selectedCategory);


          setRecipes(filteredRecipes);
        } else {
          console.error("Expected an array but got:", data);
          setError("Invalid data format from API");
        }
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setError("Failed to fetch recipes");
      });
  }, [selectedCategory]); // ✅ Runs when `selectedCategory` changes

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      <div>
        <Link to="/recipes"><button>All</button></Link>
        <Link to="/recipes?category=Breakfast"><button>Breakfast</button></Link>
        <Link to="/recipes?category=Lunch"><button>Lunch</button></Link>
        <Link to="/recipes?category=Dinner"><button>Dinner</button></Link>
      </div>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.title}</h3>
            <p>{recipe.instr}</p>
            <p><strong>Category:</strong> {recipe.category}</p>
            <img src={recipe.imgurl} alt={recipe.title} width="440px" />
          </div>
        ))
      )}
    </div>
  );
};

export default Recipes;
