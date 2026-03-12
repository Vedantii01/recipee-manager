const express = require("express");
const router = express.Router();

const {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipeController");

router.get("/recipes", getRecipes);
router.post("/recipes", addRecipe);
router.put("/recipes/:id", updateRecipe);
router.delete("/recipes/:id", deleteRecipe);

module.exports = router;