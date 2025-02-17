import React from "react";
import Header from "../../components/Header/Header";
import DailyCaloriesForm from "../../components/DailyCaloriesForm/DailyCaloriesForm";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={`${styles.container} ${styles.background}`}>
      <Header />
      <DailyCaloriesForm />
    </div>
  );
};

export default MainPage;
