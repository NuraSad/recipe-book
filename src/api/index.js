import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const insertRecipe = (payload) => api.post(`/recipes`, payload);
export const getAllRecipes = () => api.get(`/recipes`);
export const updateRecipeById = (id, payload) =>
  api.put(`/recipes/${id}`, payload);
export const deleteRecipeById = (id) => api.delete(`/recipes/${id}`);
export const getRecipeById = (id) => api.get(`/recipes/${id}`);

const apis = {
  insertRecipe,
  getAllRecipes,
  updateRecipeById,
  deleteRecipeById,
  getRecipeById,
};

export default apis;
