import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import Header from "../../components/Header/Header";
import { register } from "../../api/auth";
import { AuthContext } from "../../context/authContext";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const RegistrationPage = () => {
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (name, email, password) => {
    try {
      const data = await register({ name, email, password, role: "user" });
      localStorage.setItem("token", data.token);
      setAuth({ token: data.token, isAuthenticated: true, user: data.user });
      console.log("Registered user name:", data.user.name);
      navigate("/calculator");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={`${styles.container} ${styles.background}`}>
      <Header />
      <h2 className={styles.title}>REGISTER</h2>
      <RegistrationForm
        onRegister={handleRegister}
        error={error}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default RegistrationPage;
