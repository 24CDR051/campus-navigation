import React from "react";
import { 
  Search, 
  X, 
  Filter, 
  Check, 
  RotateCcw, 
  SlidersHorizontal,
  Clock
} from "lucide-react";
import { CATEGORIES, AMENITIES_LIST } from "../data/campusData";

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedAmenities,
  onToggleAmenity,
  onlyOpenNow,
  onToggleOpenNow,
  onResetFilters,
  totalResults
}) {
  const hasActiveFilters = 
    searchQuery.trim() !== "" || 
    selectedCategory !== "all" || 
    selectedAmenities.length > 0 || 
    onlyOpenNow;

  return (
    <div className="search-page-header">
      {/* Top Search Field */}
      <div className="search-input-wrapper" style={{ maxWidth: "100%" }}>
        <Search size={20} className="search-icon-hero" />
        <input
          type="text"
          className="search-input-field"
          placeholder="Search by building name, code (e.g., LIB-01), department, or facility..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search campus buildings and facilities"
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange("")}
            title="Clear search query"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="filter-controls-row">
        {/* Category Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--slate-500)", marginRight: "0.2rem" }}>
            Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`map-filter-pill ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Amenity & Feature Filters */}
        <div className="amenity-filters-row">
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--slate-500)", marginRight: "0.2rem" }}>
            Amenities:
          </span>

          {/* Open Now Toggle */}
          <button
            className={`amenity-filter-chip ${onlyOpenNow ? "active" : ""}`}
            onClick={onToggleOpenNow}
          >
            <Clock size={13} />
            <span>Open Now</span>
            {onlyOpenNow && <Check size={12} />}
          </button>

          {AMENITIES_LIST.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                className={`amenity-filter-chip ${isSelected ? "active" : ""}`}
                onClick={() => onToggleAmenity(amenity)}
              >
                <span>{amenity}</span>
                {isSelected && <Check size={12} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Bar */}
      <div className="search-results-bar" style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--slate-100)" }}>
        <span className="results-count-text">
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? "location" : "locations"}
          {hasActiveFilters && " matching criteria"}
        </span>

        {hasActiveFilters && (
          <button className="btn-reset-filters" onClick={onResetFilters}>
            <RotateCcw size={13} style={{ display: "inline", marginRight: "4px" }} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
