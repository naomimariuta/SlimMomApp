import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import styles from "./DiaryAddProductForm.module.css";
import Button from "../Button/Button";
import { BloodTypeContext } from "../../context/bloodTypeContext";
import Loader from "../Loader/Loader";

const DiaryAddProductForm = ({ onSave, onClose }) => {
  const [productName, setProductName] = useState("");
  const [grams, setGrams] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { bloodType } = useContext(BloodTypeContext);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    const fetchProductSuggestions = async () => {
      if (!productName) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products/search",
          {
            params: { query: productName, bloodType },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching product suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductSuggestions();
  }, [productName, bloodType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProduct = suggestions.find(
      (suggestion) => suggestion.title === productName
    );
    if (selectedProduct) {
      const product = {
        ...selectedProduct,
        grams,
        date: new Date(),
      };
      onSave(product);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Enter product name
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className={styles.inputProduct}
                required
              />
            </label>
            {loading && <Loader />}
            {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion._id}
                    onClick={() => setProductName(suggestion.title)}
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Grams
              <input
                type="number"
                value={grams}
                onChange={(e) => setGrams(e.target.value)}
                className={styles.inputGrams}
                required
              />
            </label>
          </div>
          <Button
            type="submit"
            text={isMobile ? "Add" : "+"}
            variant="colorButton"
            size={isMobile ? "size180" : "round48"}
          />
        </form>
      </div>
    </>
  );
};

export default DiaryAddProductForm;
