import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser,
  );

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create your bookshelf account</h1>
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
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          autoComplete="given-name"
          required
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          autoComplete="family-name"
          required
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
        <p className="form-help" id="password-help">
          Use an uncommon password with letters, numbers, and special
          characters.
        </p>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default RegisterPage;
