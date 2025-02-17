import React, { useContext, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axiosInstance from "../../api/axios";
import { useMediaQuery } from "react-responsive";
import Logo from "../Logo/Logo";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  const handleLogout = useCallback(async () => {
    try {
      const userName = auth.user ? auth.user.name : "Unknown user";
      await axiosInstance.post("/auth/logout");
      setAuth({ token: null, isAuthenticated: false, user: null });
      console.log(`User ${userName} logged out successfully`);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [auth.user, setAuth]);

  const handleLogoClick = useCallback(async () => {
    if (auth.isAuthenticated) {
      await handleLogout();
    }
    navigate("/");
  }, [auth.isAuthenticated, handleLogout, navigate]);

  //* NavLinks
  const renderNavLinks = () => {
    if (auth.isAuthenticated) {
      return isDesktop ? (
        <>
          <span className={styles.verticalLineDesktop}></span>
          <Link to="/diary" className={styles.link}>
            Diary
          </Link>
          <Link to="/calculator" className={styles.link}>
            Calculator
          </Link>
          <div className={styles.userSection}>
            <span className={styles.user}>{auth.user.name}</span>
            <span className={styles.verticalLine}></span>
            <button onClick={handleLogout} className={styles.button}>
              Exit
            </button>
          </div>
        </>
      ) : isTablet ? (
        <>
          <div className={styles.userSection}>
            <span className={styles.user}>{auth.user.name}</span>
            <span className={styles.verticalLine}></span>
            <button onClick={handleLogout} className={styles.button}>
              Exit
            </button>
          </div>
          <div className={styles.burgerContainer}>
            <BurgerMenu />
          </div>
        </>
      ) : (
        <>
          <div className={styles.burgerContainer}>
            <BurgerMenu />
          </div>
        </>
      );
    } else {
      return (
        <>
          <span className={styles.verticalLineDesktop}></span>
          <Link to="/login" className={styles.link}>
            Log In
          </Link>
          <Link to="/registration" className={styles.link}>
            Registration
          </Link>
        </>
      );
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (auth.isAuthenticated) {
        await handleLogout();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [auth.isAuthenticated, handleLogout]);

  return (
    <>
      <header className={styles.header}>
        <div
          className={styles.logo}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <Logo />
        </div>
        <nav className={styles.nav}>{renderNavLinks()}</nav>
      </header>
      {isMobile && auth.isAuthenticated && (
        <section className={styles.userSectionMobile}>
          <button
            className={styles.backButton}
            onClick={() => window.history.back()}
          ></button>
          <div className={styles.userContainer}>
            <span className={styles.user}>{auth.user.name}</span>
            <span className={styles.verticalLine}></span>
            <button onClick={handleLogout} className={styles.button}>
              Exit
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Header;
