import React, { useEffect } from "react";
import { X, ShieldAlert, PhoneCall, AlertCircle, HeartPulse, Shield, HelpCircle } from "lucide-react";
import { EMERGENCY_CONTACTS } from "../data/campusData";

export default function EmergencyModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="emergency-modal-box" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          style={{ background: "var(--slate-100)", color: "var(--slate-700)" }}
          aria-label="Close emergency modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "var(--rose-50)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--rose-600)" }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--slate-900)" }}>Campus Emergency Contacts</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--slate-500)" }}>24/7 Security, Medical Assistance & Quick Support</p>
          </div>
        </div>

        <div className="emergency-list">
          {EMERGENCY_CONTACTS.map((contact, index) => (
            <div key={index} className="emergency-card-item">
              <div>
                <span className="card-category-tag" style={{ background: `${contact.color}15`, color: contact.color, borderColor: `${contact.color}30` }}>
                  {contact.badge}
                </span>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--slate-900)", marginTop: "0.3rem" }}>
                  {contact.title}
                </h4>
                <p style={{ fontSize: "0.8rem", color: "var(--slate-600)" }}>
                  {contact.description}
                </p>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: contact.color, marginTop: "0.3rem" }}>
                  {contact.number}
                </div>
              </div>

              <a
                href={`tel:${contact.number.replace(/[^0-9]/g, "")}`}
                className="btn-emergency-call"
                style={{ backgroundColor: contact.color }}
              >
                <PhoneCall size={14} />
                <span>Call</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
