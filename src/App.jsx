import React, { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import LocationCard from "./components/LocationCard";
import LocationDetailModal from "./components/LocationDetailModal";
import RoutePlanner from "./components/RoutePlanner";
import SearchFilterBar from "./components/SearchFilterBar";
import CategoryGrid from "./components/CategoryGrid";
import EmergencyModal from "./components/EmergencyModal";
import Toast from "./components/Toast";
import { CAMPUS_LOCATIONS, CAMPUS_INFO } from "./data/campusData";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Compass, 
  Bookmark, 
  ArrowRight, 
  Clock, 
  Navigation, 
  Check, 
  ShieldCheck, 
  GraduationCap,
  History,
  X
} from "lucide-react";
import "./styles/App.css";

export default function App() {
  // Navigation tabs: 'home' | 'map' | 'search' | 'route' | 'favorites'
  const [activeTab, setActiveTab] = useState("home");

  // LocalStorage state for Favourites and Recently Viewed
  const [favorites, setFavorites] = useLocalStorage("campus_nav_favorites", ["lib-01", "cs-b"]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useLocalStorage("campus_nav_recent", ["lib-01", "food-court"]);

  // Modal and Active Inspection States
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [detailModalLocation, setDetailModalLocation] = useState(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Routing state
  const [activeRoute, setActiveRoute] = useState(null);
  const [routeOriginId, setRouteOriginId] = useState("");
  const [routeDestId, setRouteDestId] = useState("");

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);

  // Autocomplete state on Home page
  const [homeSearchQuery, setHomeSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Track recently viewed locations
  const trackViewedLocation = (location) => {
    if (!location) return;
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== location.id);
      return [location.id, ...filtered].slice(0, 8);
    });
  };

  // Toggle favorite
  const isFavorite = (locationId) => favorites.includes(locationId);

  const toggleFavorite = (location) => {
    if (isFavorite(location.id)) {
      setFavorites((prev) => prev.filter((id) => id !== location.id));
      showToast(`Removed "${location.name}" from Saved Places`);
    } else {
      setFavorites((prev) => [...prev, location.id]);
      showToast(`Saved "${location.name}" to Favourites`);
    }
  };

  // Open detailed modal
  const handleOpenDetails = (location) => {
    setDetailModalLocation(location);
    trackViewedLocation(location);
  };

  // Direct Navigate Trigger: Opens Route Planner with destination prefilled
  const handleNavigateTo = (location) => {
    setRouteDestId(location.id);
    if (!routeOriginId) {
      setRouteOriginId("gate-north"); // default origin: north entrance
    }
    setActiveTab("route");
    showToast(`Destination set to ${location.name}`);
  };

  // View Route directly on Map
  const handleViewRouteOnMap = (route) => {
    setActiveRoute(route);
    setActiveTab("map");
  };

  // Quick category card selection from home
  const handleHomeCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab("search");
  };

  // Filtered Locations for Directory Search
  const searchResults = useMemo(() => {
    return CAMPUS_LOCATIONS.filter((loc) => {
      // Query match across name, code, shortDesc, description, departments, facilities
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = loc.name.toLowerCase().includes(q);
        const matchesCode = loc.code.toLowerCase().includes(q);
        const matchesDesc = (loc.description || "").toLowerCase().includes(q);
        const matchesDept = (loc.departments || []).some((d) => d.toLowerCase().includes(q));
        const matchesFacility = (loc.facilities || []).some((f) => f.toLowerCase().includes(q));

        if (!matchesName && !matchesCode && !matchesDesc && !matchesDept && !matchesFacility) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && loc.category !== selectedCategory) {
        return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          loc.facilities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Open now filter
      if (onlyOpenNow && !loc.isOpenNow) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedAmenities, onlyOpenNow]);

  // Home Autocomplete suggestions
  const autocompleteSuggestions = useMemo(() => {
    if (!homeSearchQuery.trim()) return [];
    const q = homeSearchQuery.toLowerCase().trim();
    return CAMPUS_LOCATIONS.filter((loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.code.toLowerCase().includes(q) ||
      loc.facilities.some((f) => f.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [homeSearchQuery]);

  // Handle Home Search Submit
  const handleHomeSearchSubmit = (e) => {
    e?.preventDefault();
    if (homeSearchQuery.trim()) {
      setSearchQuery(homeSearchQuery);
      setActiveTab("search");
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedAmenities([]);
    setOnlyOpenNow(false);
  };

  // Amenity Toggle
  const handleToggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Recently Viewed objects
  const recentlyViewedLocations = useMemo(() => {
    return recentlyViewedIds
      .map((id) => CAMPUS_LOCATIONS.find((loc) => loc.id === id))
      .filter(Boolean);
  }, [recentlyViewedIds]);

  // Favourites objects
  const favoriteLocations = useMemo(() => {
    return favorites
      .map((id) => CAMPUS_LOCATIONS.find((loc) => loc.id === id))
      .filter(Boolean);
  }, [favorites]);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={favorites.length}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Demonstration Banner */}
      <div className="demo-banner">
        <span className="demo-pill">Campus Model</span>
        <span>{CAMPUS_INFO.announcement}</span>
      </div>

      {/* Main App Canvas */}
      <main className="main-content">
        {/* ====================================================================
            1. HOME PAGE
            ==================================================================== */}
        {activeTab === "home" && (
          <div className="home-view">
            {/* Hero Section */}
            <section className="home-hero">
              <div className="hero-content">
                <div className="hero-tag">
                  <GraduationCap size={14} />
                  <span>Interactive Collegiate Guide</span>
                </div>
                <h1 className="hero-title">
                  Find your way across <span className="hero-highlight">Apex Campus</span> effortlessly.
                </h1>
                <p className="hero-subtitle">
                  Instant search for lecture halls, laboratories, the central library, dining pavilions, student services, and accessible step-free walking paths.
                </p>

                {/* Live Search Box with Autocomplete */}
                <form className="hero-search-box" onSubmit={handleHomeSearchSubmit}>
                  <div className="search-input-wrapper">
                    <Search size={22} className="search-icon-hero" />
                    <input
                      type="text"
                      className="search-input-field"
                      placeholder="Search buildings, rooms, departments, or facilities (e.g. CS-B, Library, Canteen)..."
                      value={homeSearchQuery}
                      onChange={(e) => setHomeSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                      aria-label="Search campus buildings and facilities"
                    />
                    {homeSearchQuery && (
                      <button
                        type="button"
                        className="search-clear-btn"
                        onClick={() => setHomeSearchQuery("")}
                        aria-label="Clear search"
                      >
                        <X size={18} />
                      </button>
                    )}
                    <button type="submit" className="search-submit-btn">
                      <span>Explore</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Autocomplete Dropdown */}
                  {isSearchFocused && autocompleteSuggestions.length > 0 && (
                    <div className="search-autocomplete-dropdown">
                      {autocompleteSuggestions.map((item) => (
                        <div
                          key={item.id}
                          className="autocomplete-item"
                          onClick={() => {
                            handleOpenDetails(item);
                            setHomeSearchQuery("");
                          }}
                        >
                          <div className="autocomplete-left">
                            <MapPin size={16} color="var(--blue-600)" />
                            <div>
                              <div className="autocomplete-title">{item.name}</div>
                              <div className="autocomplete-desc">{item.shortDesc}</div>
                            </div>
                          </div>
                          <span className="autocomplete-code">{item.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </form>

                {/* Quick Search Chips */}
                <div className="quick-chips-wrapper">
                  <span className="quick-chip-label">Popular Searches:</span>
                  {["Central Library", "Computer Science Lab", "Dining Pavilion", "Sports Gym", "Student Clinic", "North Gate"].map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="quick-chip"
                        onClick={() => {
                          setSearchQuery(tag);
                          setActiveTab("search");
                        }}
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            </section>

            {/* Recently Viewed Locations */}
            {recentlyViewedLocations.length > 0 && (
              <section className="recently-viewed-section">
                <div className="recently-viewed-header">
                  <div className="recently-viewed-title">
                    <History size={18} color="var(--blue-600)" />
                    <span>Recently Viewed</span>
                  </div>
                  <button
                    className="btn-clear-recent"
                    onClick={() => setRecentlyViewedIds([])}
                    title="Clear recent history"
                  >
                    Clear History
                  </button>
                </div>
                <div className="recent-items-row">
                  {recentlyViewedLocations.map((loc) => (
                    <div
                      key={loc.id}
                      className="recent-item-chip"
                      onClick={() => handleOpenDetails(loc)}
                      role="button"
                      tabIndex={0}
                    >
                      <MapPin size={14} color="var(--blue-600)" />
                      <span className="recent-item-name">{loc.name}</span>
                      <span className="recent-item-code">{loc.code}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Facility Categories */}
            <div className="section-header">
              <div>
                <h2 className="section-title">Explore by Facility Category</h2>
                <p className="section-subtitle">Browse campus areas categorized by function</p>
              </div>
              <button 
                className="section-link-btn" 
                onClick={() => {
                  setSelectedCategory("all");
                  setActiveTab("search");
                }}
              >
                <span>View All Directory</span>
                <ArrowRight size={15} />
              </button>
            </div>
            <CategoryGrid onSelectCategory={handleHomeCategoryClick} />

            {/* Popular Destinations */}
            <div className="section-header">
              <div>
                <h2 className="section-title">Popular Campus Destinations</h2>
                <p className="section-subtitle">Frequently visited landmarks, study halls, and amenities</p>
              </div>
              <button 
                className="section-link-btn" 
                onClick={() => setActiveTab("map")}
              >
                <span>View On Map</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="locations-grid">
              {CAMPUS_LOCATIONS.filter((l) => l.popular).slice(0, 6).map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  onOpenDetails={handleOpenDetails}
                  onNavigate={handleNavigateTo}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            2. INTERACTIVE MAP VIEW
            ==================================================================== */}
        {activeTab === "map" && (
          <MapView
            selectedLocation={selectedLocation}
            onSelectLocation={(loc) => {
              setSelectedLocation(loc);
              if (loc) trackViewedLocation(loc);
            }}
            activeRoute={activeRoute}
            onClearRoute={() => setActiveRoute(null)}
            onOpenRoutePlanner={(loc) => handleNavigateTo(loc)}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onOpenDetails={handleOpenDetails}
          />
        )}

        {/* ====================================================================
            3. SEARCH & DIRECTORY VIEW
            ==================================================================== */}
        {activeTab === "search" && (
          <div className="search-view">
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedAmenities={selectedAmenities}
              onToggleAmenity={handleToggleAmenity}
              onlyOpenNow={onlyOpenNow}
              onToggleOpenNow={() => setOnlyOpenNow(!onlyOpenNow)}
              onResetFilters={handleResetFilters}
              totalResults={searchResults.length}
            />

            {searchResults.length > 0 ? (
              <div className="locations-grid">
                {searchResults.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    onOpenDetails={handleOpenDetails}
                    onNavigate={handleNavigateTo}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state-box">
                <div className="empty-icon-box">
                  <Search size={28} />
                </div>
                <h3 className="empty-title">No matching locations found</h3>
                <p className="empty-desc">
                  We couldn't find any campus facilities matching "<strong>{searchQuery}</strong>" with the selected filters.
                  Try searching with different keywords like "Library", "CS", or resetting the category filter.
                </p>
                <button className="btn-card-route" onClick={handleResetFilters}>
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ====================================================================
            4. ROUTE PLANNER VIEW
            ==================================================================== */}
        {activeTab === "route" && (
          <RoutePlanner
            initialOriginId={routeOriginId}
            initialDestinationId={routeDestId}
            onRouteCalculated={(route) => setActiveRoute(route)}
            onViewOnMap={handleViewRouteOnMap}
          />
        )}

        {/* ====================================================================
            5. SAVED / FAVOURITE PLACES
            ==================================================================== */}
        {activeTab === "favorites" && (
          <div className="favorites-view">
            <div className="section-header">
              <div>
                <h2 className="section-title">Saved Places</h2>
                <p className="section-subtitle">
                  Your bookmarked campus buildings, study spots, and dining spots saved locally
                </p>
              </div>
              {favorites.length > 0 && (
                <button
                  className="btn-reset-filters"
                  onClick={() => {
                    setFavorites([]);
                    showToast("Cleared all saved places");
                  }}
                >
                  Clear All Saved
                </button>
              )}
            </div>

            {favoriteLocations.length > 0 ? (
              <div className="locations-grid">
                {favoriteLocations.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    onOpenDetails={handleOpenDetails}
                    onNavigate={handleNavigateTo}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state-box">
                <div className="empty-icon-box" style={{ background: "var(--rose-50)", color: "var(--rose-500)" }}>
                  <Bookmark size={28} />
                </div>
                <h3 className="empty-title">No saved places yet</h3>
                <p className="empty-desc">
                  Save your most frequented buildings, lecture auditoriums, and favorite library corners by clicking the bookmark icon on any card.
                </p>
                <button
                  className="btn-card-route"
                  onClick={() => {
                    setSelectedCategory("all");
                    setActiveTab("search");
                  }}
                >
                  <span>Explore Campus Directory</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ====================================================================
          MODALS & OVERLAYS
          ==================================================================== */}
      {/* Location Details Bottom-Sheet/Modal */}
      <LocationDetailModal
        location={detailModalLocation}
        onClose={() => setDetailModalLocation(null)}
        onNavigate={handleNavigateTo}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      {/* Campus Emergency Support Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Toast Alert Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Compass size={18} color="var(--blue-600)" />
            <strong style={{ color: "var(--slate-800)" }}>Campus Navigator</strong>
            <span>• Apex University Open Cartography Project</span>
          </div>
          <div>
            Built with React, Vite, Leaflet & OpenStreetMap. High-contrast & Accessible.
          </div>
        </div>
      </footer>
    </div>
  );
}
