import React from "react";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <RingLoader color="#00B5D8" size={100} />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999,
  },
};

export default Loader;
