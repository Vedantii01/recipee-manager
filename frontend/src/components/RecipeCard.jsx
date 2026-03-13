import React from "react";

const RecipeCard = ({ recipe, onDelete, onEdit }) => {
  if (!recipe) return null;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      onDelete(recipe._id);
    }
  };

  const getCategoryImage = () => {
    const category = recipe.category?.toLowerCase();

    const images = {
      breakfast: [
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
      ],
      lunch: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd"],
      dinner: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      ],
      dessert: [
        "https://images.unsplash.com/photo-1551024601-bec78aea704b",
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      ],
      snack: ["https://images.unsplash.com/photo-1585238342024-78d387f4a707"],
      beverage: [
        "https://images.unsplash.com/photo-1497534446932-c925b458314e",
      ],
      other: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"],
    };

    const categoryImages = images[category] || images.other;

    const seed = recipe._id
      ? recipe._id
          .toString()
          .split("")
          .reduce((a, b) => a + b.charCodeAt(0), 0)
      : 0;

    const index = seed % categoryImages.length;

    return `${categoryImages[index]}?auto=format&fit=crop&w=800&q=80`;
  };

  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        <img src={getCategoryImage()} alt="recipe" className="recipe-image" />

        <div className="recipe-image-overlay">
          <span className="recipe-category">{recipe.category || "Food"}</span>
        </div>
      </div>

      <div className="recipe-card-content">
        <h3 className="recipe-name">{recipe.name}</h3>

        <p>⏰ {recipe.time || "N/A"} minutes</p>

        <p>
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>

        <p>
          <strong>Instructions:</strong> {recipe.instructions}
        </p>

        <div className="recipe-actions">
          <button onClick={() => onEdit(recipe)} className="btn-edit">
            ✏️ Edit
          </button>

          <button onClick={handleDelete} className="btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
