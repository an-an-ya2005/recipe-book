import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    instr: "",
    imgurl: "",
    category: "",
    ingredients: [{ name: "", qty: "" }],
  });

  const navigate = useNavigate(); // ✅ Use for redirection

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index][e.target.name] = e.target.value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", qty: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/v1/recipe/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    const data = await response.json();
    console.log(data);
    alert("Recipe added successfully!");

    // ✅ Redirect to Recipes page with category filter
    navigate(`/recipes?category=${recipe.category}`);
  };

  return (
    <div>
      <h2>Add a Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Recipe Title" value={recipe.title} onChange={handleChange} required />
        <textarea name="instr" placeholder="Instructions" value={recipe.instr} onChange={handleChange} required />
        <input type="text" name="imgurl" placeholder="Image URL" value={recipe.imgurl} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category (e.g., Breakfast, Lunch)" value={recipe.category} onChange={handleChange} required />

        <h3>Ingredients</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input type="text" name="name" placeholder="Ingredient Name" value={ingredient.name} onChange={(e) => handleIngredientChange(index, e)} required />
            <input type="text" name="qty" placeholder="Quantity" value={ingredient.qty} onChange={(e) => handleIngredientChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
