import React from "react";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo";
import UserInfo from "../UserInfo/UserInfo";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Logo />
      {isAuthenticated && <UserInfo />}
      <Navigation />
    </header>
  );
};

export default Header;
