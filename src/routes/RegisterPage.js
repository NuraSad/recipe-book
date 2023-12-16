import { useState } from "react";
import { redirect } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";

import authService from "../api/auth-service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    authService.userRegister(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        return redirect(`/recipes/signin`);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <RegisterForm
      username={username}
      onChangeUsername={onChangeUsername}
      email={email}
      onChangeEmail={onChangeEmail}
      password={password}
      onChangePassword={onChangePassword}
      confirmPassword={confirmPassword}
      onChangeConfirmPassword={onChangeConfirmPassword}
      onSubmit={handleRegister}
    >
      {message && (
        <div
          id={successful ? "successful-message" : "error-message"}
          role="alert"
        >
          {message}
        </div>
      )}
    </RegisterForm>
  );
};

export default Register;
