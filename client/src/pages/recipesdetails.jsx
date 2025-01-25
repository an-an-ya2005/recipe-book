import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams(); // Extract recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/api/v1/recipe/recipes/${id}`) // Adjust endpoint
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]);

  if (!recipe) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.name}</h1>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
