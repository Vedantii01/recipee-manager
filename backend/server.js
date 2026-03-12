const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Recipe = require("./models/Recipe");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
"mongodb+srv://rutujab2021_db_user:xqo5jxeClSVrRolu@cluster0.pkeo5es.mongodb.net/recipeDB"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// GET all recipes
app.get("/api/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});


// ADD recipe
app.post("/api/recipes", async (req, res) => {
  const recipe = new Recipe(req.body);
  const savedRecipe = await recipe.save();
  res.json(savedRecipe);
});


// DELETE recipe
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe" });
  }
});


// UPDATE recipe
app.put("/api/recipes/:id", async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedRecipe);
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});