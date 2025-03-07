import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./DailyCaloriesForm.module.css";
import { BloodTypeContext } from "../../context/bloodTypeContext";
import { getDailyIntake } from "../../api/products";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { showLoader, hideLoader } from "../../store/loaderSlice";
import { AuthContext } from "../../context/authContext";
import { CalorieInfoContext } from "../../context/calorieInfoContext";
import { saveCalorieInfo } from "../../api/calorieInfo";

const translations = {
  calculate_daily_intake: "Calculate Daily Intake",
  height: "Height",
  age: "Age",
  currentWeight: "Current Weight",
  desireWeight: "Desired Weight",
  blood_type: "Blood Type",
  start_losing_weight: "Start Losing Weight",
  recommended_calorie_intake: "Recommended Calorie Intake",
  foods_not_eat: "Foods Not Recommended",
};

const DailyCaloriesForm = () => {
  const [formData, setFormData] = useState({
    height: "",
    age: "",
    currentWeight: "",
    desireWeight: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recCalories, setRecCalories] = useState(null);
  const [forbiddenFoods, setForbiddenFoods] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.isLoading);
  const navigate = useNavigate();
  const { bloodType, setBloodType } = useContext(BloodTypeContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { setCalorieInfo } = useContext(CalorieInfoContext);

  useEffect(() => {
    if (auth.calorieInfo) {
      setFormData({
        height: auth.calorieInfo.height,
        age: auth.calorieInfo.age,
        currentWeight: auth.calorieInfo.currentWeight,
        desireWeight: auth.calorieInfo.desireWeight,
      });
      setBloodType(auth.calorieInfo.bloodType);
      setRecCalories(auth.calorieInfo.dailyRate);
      setForbiddenFoods(auth.calorieInfo.notRecommendedFoods);
    }
  }, [auth.calorieInfo, setBloodType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveCalorieData = async (dailyKcal, notRecommendedProducts) => {
    console.log("sunt in saveCalorieData");
    const calorieInfo = {
      height: formData.height,
      age: formData.age,
      currentWeight: formData.currentWeight,
      desireWeight: formData.desireWeight,
      bloodType: bloodType,
      dailyRate: dailyKcal,
      notRecommendedFoods:
        notRecommendedProducts.map((food) => food.title) || [],
    };
    console.log("am iesit si intru la saveCalorieInfo");
    await saveCalorieInfo(calorieInfo);
    setCalorieInfo(calorieInfo);

    setAuth((prevAuth) => ({
      ...prevAuth,
      calorieInfo: calorieInfo,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoader());
    try {
      const params = {
        weight: formData.currentWeight,
        height: formData.height,
        age: formData.age,
        bloodType: bloodType,
      };

      const data = await getDailyIntake(params);
      setRecCalories(data.dailyKcal);
      setForbiddenFoods(data.notRecommendedProducts);

      if (auth.isAuthenticated) {
        await saveCalorieData(data.dailyKcal, data.notRecommendedProducts);
        setIsModalOpen(false);
        navigate("/calculator");
      } else {
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleStartLosingWeight = () => {
    setIsModalOpen(false);
    navigate("/register");
  };

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.title}>
          {translations.calculate_daily_intake}
        </div>
        <div className={styles.twoColumns}>
          <section>
            {["height", "age", "currentWeight", "desireWeight"].map((field) => (
              <div key={field} className={styles.formGroup}>
                <label className={styles.label}>
                  {translations[field]} *
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </label>
              </div>
            ))}
            <div className={styles.formGroup}>
              <span className={styles.label}>{translations.blood_type} *</span>
              <div className={styles.divider}></div>
              <div className={styles.radioGroup}>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name="bloodType"
                    value="1"
                    checked={bloodType === "1"}
                    onChange={(e) => setBloodType(e.target.value)}
                    required
                  />
                  <span>0</span>
                </label>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name="bloodType"
                    value="2"
                    checked={bloodType === "2"}
                    onChange={(e) => setBloodType(e.target.value)}
                    required
                  />
                  <span>A</span>
                </label>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name="bloodType"
                    value="3"
                    checked={bloodType === "3"}
                    onChange={(e) => setBloodType(e.target.value)}
                    required
                  />
                  <span>B</span>
                </label>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name="bloodType"
                    value="4"
                    checked={bloodType === "4"}
                    onChange={(e) => setBloodType(e.target.value)}
                    required
                  />
                  <span>AB</span>
                </label>
              </div>
            </div>
          </section>
        </div>

        <Button
          type="submit"
          text={translations.start_losing_weight}
          variant="colorButton"
        />
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className={styles.modalTitle}>
          {translations.recommended_calorie_intake}
        </h2>
        <p className={styles.calorieContainer}>
          <span className={styles.calorieNumber}>{recCalories}</span>
          <span className={styles.calorieUnit}> kcal</span>
        </p>
        <div className={styles.dividerLine}></div>
        <h3 className={styles.modalSubtitle}>{translations.foods_not_eat}</h3>
        <ol className={styles.forbiddenFoodsList}>
          {forbiddenFoods.map((food, index) => (
            <li key={food._id || index}>{food.title}</li>
          ))}
        </ol>
        <div className={styles.modalButtonContainer}>
          <Button
            type="button"
            text={translations.start_losing_weight}
            variant="colorButton"
            handlerFunction={handleStartLosingWeight}
          />
        </div>
      </Modal>
    </>
  );
};

export default DailyCaloriesForm;
