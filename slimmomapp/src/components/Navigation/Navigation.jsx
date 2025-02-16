import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex space-x-6">
      <Link
        to="/"
        className="text-lg text-gray-700 hover:text-blue-500 transition-colors"
      >
        Home
      </Link>
      <Link
        to="/diary"
        className="text-lg text-gray-700 hover:text-blue-500 transition-colors"
      >
        Diary
      </Link>
      <Link
        to="/calculator"
        className="text-lg text-gray-700 hover:text-blue-500 transition-colors"
      >
        Calculator
      </Link>
    </nav>
  );
};

export default Navigation;
