import React, { useEffect } from "react";
import { 
  X, 
  Navigation, 
  Bookmark, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  HelpCircle, 
  Lightbulb, 
  Accessibility,
  Wifi,
  Sparkles
} from "lucide-react";

export default function LocationDetailModal({
  location,
  onClose,
  onNavigate,
  isFavorite,
  onToggleFavorite
}) {
  if (!location) return null;

  const isFav = isFavorite(location.id);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="detail-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Hero Header */}
        <div className="modal-header-hero">
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close details modal"
          >
            <X size={20} />
          </button>

          <div className="modal-tag-row">
            <span className="modal-category-badge">{location.categoryName}</span>
            <span className="modal-code-badge">{location.code}</span>
          </div>

          <h2 className="modal-title">{location.name}</h2>
          <p className="modal-shortDesc">{location.shortDesc}</p>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Action Row */}
          <div className="modal-action-bar">
            <button 
              className="btn-modal-navigate"
              onClick={() => {
                onClose();
                onNavigate(location);
              }}
            >
              <Navigation size={17} />
              <span>Get Directions Here</span>
            </button>

            <button 
              className={`btn-modal-fav ${isFav ? "favorited" : ""}`}
              onClick={() => onToggleFavorite(location)}
            >
              <Bookmark size={17} fill={isFav ? "currentColor" : "none"} />
              <span>{isFav ? "Saved" : "Save Place"}</span>
            </button>
          </div>

          {/* About / Description */}
          <div className="modal-info-block">
            <h4 className="info-block-title">Overview</h4>
            <p style={{ color: "var(--slate-700)", fontSize: "0.93rem", lineHeight: 1.6 }}>
              {location.description}
            </p>
          </div>

          {/* Operating Hours */}
          <div className="modal-info-block">
            <h4 className="info-block-title">Operating Schedule</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--slate-800)", fontSize: "0.9rem" }}>
              <Clock size={16} color="var(--blue-600)" />
              <strong>{location.openHours}</strong>
              <span style={{ color: "var(--emerald-600)", fontWeight: 700, fontSize: "0.82rem", marginLeft: "0.5rem" }}>
                (Currently Open)
              </span>
            </div>
          </div>

          {/* Facilities & Amenities */}
          {location.facilities && location.facilities.length > 0 && (
            <div className="modal-info-block">
              <h4 className="info-block-title">Facilities & Amenities</h4>
              <div className="facilities-pill-grid">
                {location.facilities.map((facility, index) => (
                  <span key={index} className="facility-pill">
                    <CheckCircle2 size={13} color="var(--blue-600)" />
                    <span>{facility}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Floor-by-Floor Directory */}
          {location.floors && location.floors.length > 0 && (
            <div className="modal-info-block">
              <h4 className="info-block-title">Floor Directory</h4>
              <div className="floor-plan-list">
                {location.floors.map((floor, index) => (
                  <div key={index} className="floor-row">
                    <span className="floor-name">{floor.level}</span>
                    <span className="floor-desc">{floor.highlights}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Departments & Offices Inside */}
          {location.departments && location.departments.length > 0 && (
            <div className="modal-info-block">
              <h4 className="info-block-title">Offices & Departments</h4>
              <ul style={{ paddingLeft: "1.2rem", color: "var(--slate-700)", fontSize: "0.88rem" }}>
                {location.departments.map((dept, index) => (
                  <li key={index} style={{ marginBottom: "0.25rem" }}>{dept}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Student Tips Banner */}
          {location.studentTips && (
            <div className="modal-info-block">
              <div className="student-tip-box">
                <Lightbulb size={20} color="var(--amber-600)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong>Student Pro-Tip:</strong> {location.studentTips}
                </div>
              </div>
            </div>
          )}

          {/* Accessibility Info */}
          {location.accessibility && (
            <div className="modal-info-block">
              <h4 className="info-block-title">Accessibility & Inclusivity</h4>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "var(--slate-700)", fontSize: "0.86rem" }}>
                <Accessibility size={18} color="var(--blue-600)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{location.accessibility}</span>
              </div>
            </div>
          )}

          {/* Contact Details */}
          {location.contact && (
            <div className="modal-info-block" style={{ borderTop: "1px solid var(--slate-100)", paddingTop: "1rem" }}>
              <h4 className="info-block-title">Contact & Inquiries</h4>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.84rem", color: "var(--slate-600)" }}>
                {location.contact.phone && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Phone size={14} color="var(--blue-600)" />
                    <span>{location.contact.phone}</span>
                  </div>
                )}
                {location.contact.email && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Mail size={14} color="var(--blue-600)" />
                    <span>{location.contact.email}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
