import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser,
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError, reset]);

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Log in to your bookshelf</h1>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          autoComplete="username"
          required
          value={formData.username}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
        {isServerError ? (
          <p className="error" role="alert">
            Login failed. Check your username and password.
          </p>
        ) : null}
        <Link to="/register">Click to register!</Link>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
