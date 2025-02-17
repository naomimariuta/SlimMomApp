import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link} activeStyle={styles.active}>
        Home
      </Link>
      <Link to="/diary" style={styles.link} activeStyle={styles.active}>
        Diary
      </Link>
      <Link to="/calculator" style={styles.link} activeStyle={styles.active}>
        Calculator
      </Link>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#9B9FAA",
    fontSize: "16px",
    fontWeight: "bold",
  },
  active: {
    color: "#FC842D",
  },
};

export default Navigation;
