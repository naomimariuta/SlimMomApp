import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive"; // Importă useMediaQuery
import styles from "./Logo.module.css";
import logoImg from "../../images/logo.png";
import logoTablet from "../../images/logo-tablet.png";
import logoDesktop from "../../images/logo-desktop.png";

const Logo = ({ isAuthenticated }) => {
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  let logoSrc = logoImg; // Valoare implicită pentru mobil

  if (isTablet) {
    logoSrc = logoTablet; // Dacă este tabletă
  } else if (isDesktop) {
    logoSrc = logoDesktop; // Dacă este desktop
  }

  return (
    <Link to="/" className={styles.logo}>
      <img
        src={isAuthenticated ? logoTablet : logoSrc} // Folosește logoTablet dacă este autentificat
        alt="Slim Mom Logo"
        className={styles.image}
      />
    </Link>
  );
};

export default Logo;
