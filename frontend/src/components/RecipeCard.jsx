import React from "react";

const RecipeCard = ({ recipe, onDelete, onEdit }) => {
  if (!recipe) return null;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      onDelete(recipe._id);
    }
  };

  const getRandomFoodImage = () => {
    const foodImages = [
      "https://images.unsplash.com/photo-1525323610652-34199644285d",
      "https://images.unsplash.com/photo-1546069901-ba9599127753",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1563729784404-70ca3a938c03",
      "https://images.unsplash.com/photo-1564393356468-7fdecaac3b0a",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    ];

    const seed = recipe._id
      ? recipe._id
          .toString()
          .split("")
          .reduce((a, b) => a + b.charCodeAt(0), 0)
      : Math.floor(Math.random() * 100);

    const index = seed % foodImages.length;

    return `${foodImages[index]}?auto=format&fit=crop&w=800&q=80`;
  };

  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        <img src={getRandomFoodImage()} alt="recipe" className="recipe-image" />

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
