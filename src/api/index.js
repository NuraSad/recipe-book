import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/recipes",
});

export const insertRecipe = (payload) => api.post(`/`, payload);
export const getAllRecipes = () => api.get(`/`);
export const updateRecipeById = (id, payload) => api.put(`/${id}`, payload);
export const deleteRecipeById = (id) => api.delete(`/${id}`);
export const getRecipeById = (id) => api.get(`/${id}`);
export const checkLikedRecipe = (id, username) => api.get(`/${id}/${username}`);
export const addOrRemoveFavouriteRecipe = (id, username) =>
  api.put(`/${id}/${username}`);

const apis = {
  insertRecipe,
  getAllRecipes,
  updateRecipeById,
  deleteRecipeById,
  getRecipeById,
  checkLikedRecipe,
  addOrRemoveFavouriteRecipe,
};

export default apis;
