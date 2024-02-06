import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/profile",
});

export const getUserProfile = (username) => api.get(`/${username}`);

export default getUserProfile;
