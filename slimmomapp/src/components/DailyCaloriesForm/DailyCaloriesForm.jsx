import React, { useState } from "react";

const DailyCaloriesForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ age: "", weight: "", height: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      <input
        name="age"
        type="number"
        placeholder="Age"
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="weight"
        type="number"
        placeholder="Weight (kg)"
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="height"
        type="number"
        placeholder="Height (cm)"
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Lose weight
      </button>
    </form>
  );
};

export default DailyCaloriesForm;
