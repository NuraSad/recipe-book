import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import authService from "../api/auth-service";

const Register = ({ isShowing, handleRegisterButton }) => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setSuccessful(false);
    const response = await authService.userRegister(data);

    if (response.response) {
      navigate("/signin");
    } else {
      setSuccessful(false);
      setMessage(response);
    }
  };

  const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must not exceed 30 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Confirm Password does not match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={`fullscreen-container ${isShowing ? "active" : ""} show`}>
      <form className="auth-form" onSubmit={handleSubmit(handleRegisterButton)}>
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          placeholder="Username..."
          {...register("username")}
        />
        {errors.username ? <p> {errors.username.message}</p> : null}
        <input
          type="text"
          name="email"
          placeholder="Email..."
          {...register("email")}
        />
        {errors.email ? <p> {errors.email.message}</p> : null}
        <input
          type="password"
          name="password"
          placeholder="Password..."
          {...register("password")}
        />
        {errors.password ? <p> {errors.password.message}</p> : null}
        <input
          type="password"
          placeholder="Confirm Password..."
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p> {errors.confirmPassword.message}</p>
        ) : null}
        <button type="submit">Register</button>
        {message && (
          <div
            id={successful ? "successful-message" : "error-message"}
            role="alert"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
