import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/recipes");
      setRecipes(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } catch (err) {
      setError("Failed to delete recipe. Please try again.");
      console.error("Error deleting recipe:", err);
    }
  };

  const handleEditRecipe = (recipe) => {
    navigate(`/edit-recipe/${recipe._id}`);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1> Cook Craft </h1>
        <Link to="/add-recipe" className="btn-add-recipe">
          ✨ Drop New Recipe
        </Link>
      </div>

      {error && <div className="error-message">⚠️ {error}</div>}

      {loading ? (
        <div className="loading">
          <div>🔥 Spicing up your recipes...</div>
        </div>
      ) : recipes.length === 0 ? (
        <div className="no-recipes">
          <h2>🍽️ No recipes found</h2>
          <p>Start by dropping your first fire recipe! 🌟</p>
          <Link to="/add-recipe" className="btn-add-recipe">
            🎨 Drop Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onDelete={handleDeleteRecipe}
              onEdit={handleEditRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
