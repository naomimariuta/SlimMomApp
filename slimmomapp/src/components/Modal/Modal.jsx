import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
      navigate("/diary");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
      navigate("/diary");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            className={styles.closeButton}
            onClick={() => {
              onClose();
              navigate("/diary");
            }}
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
