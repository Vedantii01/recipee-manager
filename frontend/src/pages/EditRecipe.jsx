import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditRecipe = () => {
  const { id } = useParams();
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

  // Fetch recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setFetchLoading(true);

        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);

        const recipe = res.data.recipe || res.data;

        if (!recipe) {
          setError("Recipe not found 😔");
          return;
        }

        setFormData({
          name: recipe.name || "",
          ingredients: recipe.ingredients || "",
          time: recipe.time || "",
          category: recipe.category || "",
          instructions: recipe.instructions || "",
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching recipe:", err);

        if (err.response && err.response.status === 404) {
          setError("Recipe not found 😔");
        } else {
          setError("Server error. Please try again.");
        }
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.ingredients || !formData.instructions) {
      setError("Please fill all required fields 📝");
      return;
    }

    try {
      setLoading(true);

      await axios.put(`http://localhost:5000/api/recipes/${id}`, formData);

      alert("Recipe updated successfully 🎉");

      navigate("/");
    } catch (err) {
      console.error("Error updating recipe:", err);
      setError("Failed to update recipe 😔");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="loading">🍳 Loading recipe...</div>;
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
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
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
          <label>⏰ Cooking Time</label>
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
