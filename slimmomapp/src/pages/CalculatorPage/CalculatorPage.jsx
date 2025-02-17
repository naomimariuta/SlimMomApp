import React from "react";
import DailyCaloriesForm from "../../components/DailyCaloriesForm/DailyCaloriesForm";
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";
import styles from "./CalculatorPage.module.css";

const Calculator = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <Header />
        <DailyCaloriesForm />
      </div>
      <div className={styles.summarySection}>
        <Summary />
      </div>
    </div>
  );
};

export default Calculator;
