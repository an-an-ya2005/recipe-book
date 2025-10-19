import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams(); // Recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/api/v1/recipe/idrecipes/${id}`) // your endpoint
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <h1>Loading...</h1>;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((item, idx) => (
          <li key={idx}>{item.qty} {item.name}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <p>{recipe.instr}</p>

      {recipe.nutrition && recipe.nutrition.length > 0 && (
        <>
          <h3>Nutrition Info:</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
              </tr>
            </thead>
            <tbody>
              {recipe.nutrition.map((n, idx) => (
                <tr key={idx}>
                  <td>{n.name}</td>
                  <td>{n.calories}</td>
                  <td>{n.protein}</td>
                  <td>{n.carbs}</td>
                  <td>{n.fat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
