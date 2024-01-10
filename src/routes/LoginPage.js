import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import authService from "../api/auth-service";

const Login = ({ isShowing, setUser, closeWindow }) => {
  // check if it's better to use action from react-router
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (data) => {
    setLoading(true);
    const response = await authService.userLogin(data);

    if (response.accessToken) {
      setLoading(false);
      setUser(response.username);
      reset();
      closeWindow((prev) => !prev);
    } else {
      setLoading(false);
      setMessage(response.response.data.message);
    }
  };

  const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must not exceed 30 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <div className={`fullscreen-container ${isShowing ? "active" : ""} show`}>
      <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
        <h1>Sign In</h1>
        <input
          type="text"
          name="username"
          placeholder="Username..."
          {...register("username")}
        />
        {errors.username ? <p> {errors.username.message}</p> : null}
        <input
          type="password"
          name="password"
          placeholder="Password..."
          {...register("password")}
        />
        {errors.password ? <p> {errors.password.message}</p> : null}
        <button type="submit">Login</button>
        {loading && <span>Loading...</span>}
        {message !== "" ? <div id="error-message">{message}</div> : null}
      </form>
    </div>
  );
};

export default Login;
