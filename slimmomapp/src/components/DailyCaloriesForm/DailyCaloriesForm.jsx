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
    navigate("/registration");
  };

  const saveCalorieData = async (dailyKcal, notRecommendedProducts) => {
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

    await saveCalorieInfo(calorieInfo);
    setCalorieInfo(calorieInfo);

    setAuth((prevAuth) => ({
      ...prevAuth,
      calorieInfo: calorieInfo,
    }));
  };

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.title}>Calculează aportul zilnic de calorii</div>

        <div className={styles.twoColumns}>
          <section>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Înălțime *
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Vârstă *
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Greutate actuală *
                <input
                  type="number"
                  name="currentWeight"
                  value={formData.currentWeight}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
            </div>
          </section>

          <section>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Greutate dorită *
                <input
                  type="number"
                  name="desireWeight"
                  value={formData.desireWeight}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
            </div>
          </section>
        </div>

        <Button
          type="submit"
          text="Începe procesul de slăbire"
          variant="colorButton"
        />
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className={styles.modalTitle}>
          Aportul zilnic recomandat de calorii
        </h2>
        <p className={styles.calorieContainer}>
          <span className={styles.calorieNumber}>{recCalories}</span>
          <span className={styles.calorieUnit}> kcal</span>
        </p>
        <div className={styles.dividerLine}></div>
        <h3 className={styles.modalSubtitle}>Alimente interzise</h3>
        <ol className={styles.forbiddenFoodsList}>
          {forbiddenFoods.map((food, index) => (
            <li key={food._id || index}>{food.title}</li>
          ))}
        </ol>
        <div className={styles.modalButtonContainer}>
          <Button
            type="button"
            text="Începe procesul de slăbire"
            variant="colorButton"
            handlerFunction={handleStartLosingWeight}
          />
        </div>
      </Modal>
    </>
  );
};

export default DailyCaloriesForm;
