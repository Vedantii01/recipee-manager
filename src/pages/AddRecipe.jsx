import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recipeAPI } from "../services/api";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    time: "",
    category: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.ingredients ||
      !formData.time ||
      !formData.category ||
      !formData.instructions
    ) {
      setError("Please fill in all fields 📝");
      return;
    }

    try {
      setLoading(true);
      await recipeAPI.createRecipe(formData);
      navigate("/");
    } catch (err) {
      setError("Failed to add recipe. Please try again. 😔");
      console.error("Error adding recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-recipe-page">
      <div className="page-header">
        <h1>🔥 Drop New Recipe</h1>
        <Link to="/" className="btn-back">
          ← Back to Vault
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="name">🍽️ Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your delicious recipe name..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">📂 Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="breakfast">🍳 Breakfast</option>
            <option value="lunch">🥗 Lunch</option>
            <option value="dinner">🍽️ Dinner</option>
            <option value="dessert">🍰 Dessert</option>
            <option value="snack">🍿 Snack</option>
            <option value="beverage">🥤 Beverage</option>
            <option value="other">🍴 Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="time">⏰ Cooking Time (minutes)</label>
          <input
            type="number"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="How long will it take to cook?"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">🥘 Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="List all ingredients needed (one per line or separated by commas)..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">📝 Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Step by step cooking instructions..."
            rows="6"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "🔥 Dropping Recipe..." : "✨ Drop Recipe"}
          </button>
          <Link to="/" className="btn-cancel">
            ❌ Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
