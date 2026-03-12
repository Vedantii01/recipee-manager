import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    time: "",
    category: "",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.ingredients || !formData.instructions) {
      setError("Please fill in all required fields 📝");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/recipes", formData);
      navigate("/"); // go back to homepage after adding
    } catch (err) {
      setError("Failed to add recipe. Please try again. 😔");
      console.error("Error adding recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-recipe-page">
      <h1>🔥 Drop New Recipe</h1>
      <Link to="/">← Back to Vault</Link>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label>🍽️ Recipe Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Recipe name"
            required
          />
        </div>

        <div className="form-group">
          <label>📂 Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
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
          <label>⏰ Cooking Time (minutes)</label>
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className="form-group">
          <label>🥘 Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="4"
            placeholder="List ingredients (comma separated or line by line)"
            required
          />
        </div>

        <div className="form-group">
          <label>📝 Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="6"
            placeholder="Step by step instructions"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
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