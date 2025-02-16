import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { MainPage } from "./pages/MainPage/MainPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { DiaryPage } from "./pages/DiaryPage/DiaryPage";
import { CalculatorPage } from "./pages/CalculatorPage/CalculatorPage";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Routes>
    </div>
  );
}

export default App;
