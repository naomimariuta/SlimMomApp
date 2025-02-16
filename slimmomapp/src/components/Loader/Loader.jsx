import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader);
  if (!isLoading) return null;

  return <div className="loader">Loading...</div>;
};

export default Loader;
