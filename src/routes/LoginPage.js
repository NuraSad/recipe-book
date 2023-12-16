import { useState } from "react";
import { redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import authService from "../api/auth-service";

const Login = () => {
  // check if it's better to use action from react-router
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (data) => {
    setLoading(true);

    const message = authService.userLogin(data);
    console.log(message);
    if (message.accessToken) {
      return redirect("/");
    } else {
      setLoading(false);
      console.log(message);
      setMessage(message);
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
      {loading && <span id="search-spinner"></span>}
      {message.message && <div id="error-message">{message.message}</div>}
    </form>
  );
};

export default Login;
