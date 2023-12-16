import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = ({
  username,
  onChangeUsername,
  password,
  onChangePassword,
  onSubmit,
}) => {
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
    <form onSubmit={(e) => handleSubmit(onSubmit(e))}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => onChangeUsername(e)}
        placeholder="Username..."
        {...register("username")}
      />
      {errors.username ? <p> {errors.username.message}</p> : null}
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => onChangePassword(e)}
        placeholder="Password..."
        {...register("password")}
      />
      {errors.password ? <p> {errors.password.message}</p> : null}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
