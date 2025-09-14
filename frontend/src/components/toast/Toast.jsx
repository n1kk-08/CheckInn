import { useEffect } from "react";
import "./toast.css";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default Toast;
