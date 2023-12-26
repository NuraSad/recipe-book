import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import authService from "../api/auth-service";

const Login = () => {
  // check if it's better to use action from react-router
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    const response = await authService.userLogin(data);
    console.log(response);

    if (response.accessToken) {
      setLoading(false);
      navigate(-1);
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e)}
        placeholder="Username..."
        {...register("username")}
      />
      {errors.username ? <p> {errors.username.message}</p> : null}
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e)}
        placeholder="Password..."
        {...register("password")}
      />
      {errors.password ? <p> {errors.password.message}</p> : null}
      <button type="submit">Login</button>
      {loading && <span>Loading...</span>}
      {message !== "" ? <div id="error-message">{message}</div> : null}
    </form>
  );
};

export default Login;
