import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <h1
      onClick={() => navigate("/")}
      className="text-3xl font-bold text-blue-500 cursor-pointer"
    >
      SlimMom App
    </h1>
  );
};

export default Logo;
