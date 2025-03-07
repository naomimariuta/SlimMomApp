import React, { useContext } from "react";
import styles from "./Summary.module.css";
import { CalorieInfoContext } from "../../context/calorieInfoContext";
import { ConsumedProductsContext } from "../../context/consumedProductsContext";
import { format, isValid } from "date-fns";

const Summary = ({ selectedDate }) => {
  const { calorieInfo } = useContext(CalorieInfoContext);
  const { consumedProducts } = useContext(ConsumedProductsContext);

  // Setăm data curentă ca dată implicită
  const currentDate = new Date();
  const validSelectedDate = isValid(selectedDate) ? selectedDate : currentDate;

  const totalConsumedCalories = consumedProducts.reduce((total, product) => {
    return total + (product.calories * product.grams) / product.weight;
  }, 0);

  const formattedDate = format(validSelectedDate, "EEEE dd MMM yyyy");

  const consumedPercentage = calorieInfo
    ? (totalConsumedCalories / calorieInfo.dailyRate) * 100
    : 0;

  return (
    <div className={styles.container}>
      <section className={styles.dailyRate}>
        {calorieInfo ? (
          <div>
            <p className={styles.title}>Summary for {formattedDate}</p>
            <p className={styles.summary}>
              Left: {Math.round(calorieInfo.dailyRate - totalConsumedCalories)}{" "}
              kcal
            </p>
            <p className={styles.summary}>
              Consumed: {Math.round(totalConsumedCalories)} kcal
            </p>
            <p className={styles.summary}>
              Daily rate: {calorieInfo.dailyRate} kcal
            </p>
            <p className={styles.summary}>
              {Math.round(consumedPercentage)}% of your daily intake
            </p>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </section>

      <section className={styles.notRec}>
        <p className={styles.title}>Foods not recommended</p>
        {calorieInfo &&
        calorieInfo.notRecommendedFoods &&
        calorieInfo.notRecommendedFoods.length > 0 ? (
          <ul className={styles.list}>
            {calorieInfo.notRecommendedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        ) : (
          <p>No foods not recommended</p>
        )}
      </section>
    </div>
  );
};

export default Summary;
