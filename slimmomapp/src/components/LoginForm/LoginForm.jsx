// src/components/LoginForm/LoginForm.jsx
import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onLogin, error, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <label className={styles.label}>
        Email *
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Password *
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles.buttonContainer}>
        <Button type="submit" text="Log in" variant="colorButton" />
        <Button
          type="button"
          text="Register"
          variant="whiteButton"
          handlerFunction={onRegister}
        />
      </div>
    </form>
  );
};

export default LoginForm;
