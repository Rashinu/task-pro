import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon/Icon";
import css from "./Modal.module.css";

const modalRoot = document.getElementById("root");

export const Modal = ({ children, onClose, className }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={`${css.modal} ${className || ""}`}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="icon-x" className={css.closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
