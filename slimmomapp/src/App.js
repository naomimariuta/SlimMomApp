import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import "./App.css";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";

function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  return (
    <div>
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
