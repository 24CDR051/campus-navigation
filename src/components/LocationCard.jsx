import React from "react";
import { 
  Bookmark, 
  Navigation, 
  Info, 
  MapPin, 
  Clock, 
  Star 
} from "lucide-react";

export default function LocationCard({
  location,
  onOpenDetails,
  onNavigate,
  isFavorite,
  onToggleFavorite
}) {
  const isFav = isFavorite(location.id);

  return (
    <div className="location-card" id={`card-${location.id}`}>
      {/* Card Top Category & Actions */}
      <div className="card-top-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span className="card-category-tag">{location.categoryName}</span>
          <span className="card-code-tag">{location.code}</span>
        </div>

        <button
          className={`card-favorite-btn ${isFav ? "favorited" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(location);
          }}
          title={isFav ? "Remove from Saved Places" : "Save this place"}
          aria-label={isFav ? `Remove ${location.name} from saved` : `Save ${location.name}`}
        >
          <Bookmark size={18} fill={isFav ? "currentColor" : "none"} strokeWidth={2} />
        </button>
      </div>

      {/* Card Body */}
      <div 
        className="card-body"
        onClick={() => onOpenDetails(location)}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpenDetails(location)}
      >
        <h3 className="card-title">{location.name}</h3>
        <p className="card-desc">{location.shortDesc || location.description}</p>

        {/* Operating status & hours */}
        <div className="card-meta-row">
          <span className="status-badge-open">
            <span className="status-dot"></span>
            <span>{location.isOpenNow ? "Open Now" : "Closed"}</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <Clock size={13} />
            <span>{location.openHours}</span>
          </span>
        </div>

        {/* Key amenities tags */}
        {location.facilities && location.facilities.length > 0 && (
          <div className="card-amenities-tags">
            {location.facilities.slice(0, 3).map((facility, index) => (
              <span key={index} className="amenity-chip">
                {facility}
              </span>
            ))}
            {location.facilities.length > 3 && (
              <span className="amenity-chip" style={{ background: "transparent", color: "var(--slate-400)" }}>
                +{location.facilities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="card-footer-actions">
        <button
          className="btn-card-details"
          onClick={() => onOpenDetails(location)}
          aria-label={`View details for ${location.name}`}
        >
          <Info size={14} />
          <span>Details</span>
        </button>

        <button
          className="btn-card-route"
          onClick={() => onNavigate(location)}
          aria-label={`Plan route to ${location.name}`}
        >
          <Navigation size={14} />
          <span>Get Directions</span>
        </button>
      </div>
    </div>
  );
}
