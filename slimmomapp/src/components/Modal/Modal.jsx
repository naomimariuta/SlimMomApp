import React, { useEffect } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  return isOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
