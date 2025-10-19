import React, { useState } from "react";
import "../styles/ree.css";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [instr, setInstr] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", qty: "" }]);

  // Ingredients handlers
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => setIngredients([...ingredients, { name: "", qty: "" }]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  // Submit recipe to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = { title, instr, imgurl, category, ingredients };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:7000/api/v1/recipe/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Recipe added successfully!");
        setTitle("");
        setInstr("");
        setImgurl("");
        setCategory("");
        setIngredients([{ name: "", qty: "" }]);
      } else {
        alert(data.message || "Failed to add recipe.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add recipe.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add / Update Recipe</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        {/* Title */}
        <label className="form-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title"
          className="form-input"
          required
        />

        {/* Category */}
        <label className="form-label">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
          required
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        {/* Image URL */}
        <label className="form-label">Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          value={imgurl}
          onChange={(e) => setImgurl(e.target.value)}
          className="form-input"
          required
        />

        {/* Instructions */}
        <label className="form-label">Instructions</label>
        <textarea
          placeholder="Instructions"
          value={instr}
          onChange={(e) => setInstr(e.target.value)}
          className="form-textarea"
          required
        />

        {/* Ingredients */}
        <label className="form-label">Ingredients</label>
        {ingredients.map((ing, idx) => (
          <div key={idx} className="ingredient-row">
            <input
              type="text"
              placeholder="Ingredient name"
              value={ing.name}
              onChange={(e) => handleIngredientChange(idx, "name", e.target.value)}
              className="form-input ingredient-input"
              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ing.qty}
              onChange={(e) => handleIngredientChange(idx, "qty", e.target.value)}
              className="form-input ingredient-input"
              required
            />
            {ingredients.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeIngredient(idx)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addIngredient}>
          + Add Ingredient
        </button>

        {/* Submit */}
        <button type="submit" className="submit-btn">
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
