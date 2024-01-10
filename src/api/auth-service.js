import axios from "axios";

const apiAuth = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});

export const userLogin = async (payload) => {
  try {
    const response = await apiAuth.post(`/signin`, payload);

    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const userLogout = () => {
  localStorage.removeItem("user");
};

export const userRegister = async (payload) => {
  try {
    const response = await apiAuth.post(`/signup`, payload);
    if (response.data.username) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return { response: response.data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
};

const authService = {
  userLogin,
  userLogout,
  userRegister,
  getCurrentUser,
  authHeader,
};

export default authService;
