import React, { useEffect } from "react";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-message">
        {type === "success" && <CheckCircle2 size={18} color="#34d399" />}
        {type === "info" && <Info size={18} color="#60a5fa" />}
        {type === "warning" && <AlertCircle size={18} color="#fbbf24" />}
        <span>{message}</span>
      </div>
    </div>
  );
}
