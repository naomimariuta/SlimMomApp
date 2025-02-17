import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = ({ onRegister, error, onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name *
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
      </label>
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
        <Button type="submit" text="Register" variant="colorButton" />
        <Button
          type="button"
          text="Log in"
          variant="whiteButton"
          handlerFunction={onLogin}
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
