import React, { useState } from "react";
import api from "../api/axios";
import "../styles/auth.css"; // Reusing auth styles for consistency

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
      const res = await api.post(`/api/v1/recipe/addrecipes`, recipeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;

      if (data?.success) {
        alert("Recipe added successfully!");
        setTitle("");
        setInstr("");
        setImgurl("");
        setCategory("");
        setIngredients([{ name: "", qty: "" }]);
      } else {
        alert(data?.message || "Failed to add recipe.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add recipe.");
    }
  };

  return (
    <div className="auth-container" style={{ padding: "4rem 1rem" }}>
      <div className="auth-card" style={{ maxWidth: "800px" }}>
        <h2 className="auth-title">Share Your Recipe</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Spicy Pasta"
              className="form-input"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
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
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={imgurl}
              onChange={(e) => setImgurl(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Instructions */}
          <div className="form-group">
            <label className="form-label">Instructions</label>
            <textarea
              placeholder="Step 1: ..."
              value={instr}
              onChange={(e) => setInstr(e.target.value)}
              className="form-input"
              style={{ minHeight: "150px", resize: "vertical" }}
              required
            />
          </div>

          {/* Ingredients */}
          <div className="form-group">
            <label className="form-label">Ingredients</label>
            {ingredients.map((ing, index) => (
              <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                  className="form-input"
                  style={{ flex: 2 }}
                  required
                />
                <input
                  type="text"
                  placeholder="Qty"
                  value={ing.qty}
                  onChange={(e) => handleIngredientChange(index, "qty", e.target.value)}
                  className="form-input"
                  style={{ flex: 1 }}
                  required
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="btn btn-secondary"
                    style={{ padding: "0.5rem", borderColor: "#ef4444", color: "#ef4444" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="btn btn-secondary"
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              + Add Ingredient
            </button>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
