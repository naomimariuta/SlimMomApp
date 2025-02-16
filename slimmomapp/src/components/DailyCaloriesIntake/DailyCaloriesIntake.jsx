import React from "react";

const DailyCalorieIntake = ({ calories }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-700">
        Daily calories intake: {calories} kcal
      </h2>
    </div>
  );
};

export default DailyCalorieIntake;
