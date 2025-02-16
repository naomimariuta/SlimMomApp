import React from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Register</h1>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default RegistrationPage;
