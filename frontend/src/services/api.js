import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const recipeAPI = {
  getAllRecipes: () => api.get("/recipes"),
  getRecipeById: (id) => api.get(`/recipes/${id}`),
  createRecipe: (recipeData) => api.post("/recipes", recipeData),
  updateRecipe: (id, recipeData) => api.put(`/recipes/${id}`, recipeData),
  deleteRecipe: (id) => api.delete(`/recipes/${id}`),
};

export default api;
