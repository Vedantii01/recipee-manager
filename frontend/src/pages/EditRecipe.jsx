import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditRecipe = () => {
  const { id } = useParams(); // MongoDB _id
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    time: "",
    category: "",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipe details on mount
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setFormData({
          name: response.data.name || "",
          ingredients: response.data.ingredients || "",
          time: response.data.time || "",
          category: response.data.category || "",
          instructions: response.data.instructions || "",
        });
        setError(null);
      } catch (err) {
        setError("Failed to fetch recipe. Please try again. 😔");
        console.error("Error fetching recipe:", err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.ingredients || !formData.instructions) {
      setError("Please fill in all required fields 📝");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/recipes/${id}`, formData);
      navigate("/"); // redirect after successful update
    } catch (err) {
      setError("Failed to update recipe. Please try again. 😔");
      console.error("Error updating recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading">
        🍳 Loading recipe details...
      </div>
    );
  }

  return (
    <div className="edit-recipe-page">
      <h1>✏️ Edit Recipe</h1>
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
            {loading ? "🔥 Updating..." : "✨ Update Recipe"}
          </button>
          <Link to="/" className="btn-cancel">
            ❌ Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;