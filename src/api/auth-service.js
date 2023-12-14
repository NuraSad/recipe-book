import axios from "axios";

const apiAuth = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});

export const userLogin = (username, password) => {
  apiAuth
    .post(`/signin`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const userLogout = () => {
  localStorage.removeItem("user");
};

export const userRegister = (username, email, password) => {
  axios.post(`/signup`, {
    username,
    email,
    password,
  });
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
