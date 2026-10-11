import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

function Modal({ children, onClose }) {
  useEffect(() => {
    if (!onClose) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className="Modal" onClick={handleBackdropClick}>
      <div className="Modal-container">
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export { Modal };