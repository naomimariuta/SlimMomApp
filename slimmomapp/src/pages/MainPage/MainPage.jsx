import React from "react";
import DailyCaloriesForm from "../../components/DailyCaloriesForm/DailyCaloriesForm";

const MainPage = () => {
  const handleFormSubmit = (data) => {
    console.log("Datele introduse:", data);
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <DailyCaloriesForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default MainPage;
