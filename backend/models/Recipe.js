const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  time: {
    type: String
  },
  category: {
    type: String
  },
  instructions: {
    type: String
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);