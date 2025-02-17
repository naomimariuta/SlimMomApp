// src/pages/LoginPage/LoginPage.jsx
import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Header from "../../components/Header/Header";
import { login } from "../../api/auth.js";
import { AuthContext } from "../../context/authContext.js";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/calculator";

  const handleLogin = async (email, password) => {
    try {
      const data = await login({ email, password });
      setAuth({ token: data.token, isAuthenticated: true, user: data.user });
      navigate(redirectTo);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = () => {
    navigate("/registration");
  };

  return (
    <div className={`${styles.container} ${styles.background}`}>
      <Header />
      <h2 className={styles.title}>LOG IN</h2>
      <LoginForm
        onLogin={handleLogin}
        error={error}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default LoginPage;
