import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { 
  CAMPUS_INFO, 
  CAMPUS_LOCATIONS, 
  CATEGORIES 
} from "../data/campusData";
import { 
  Crosshair, 
  Layers, 
  Maximize2, 
  X, 
  Navigation, 
  Info, 
  Bookmark, 
  Check, 
  MapPin, 
  Sparkles,
  AlertTriangle
} from "lucide-react";

export default function MapView({
  selectedLocation,
  onSelectLocation,
  activeRoute,
  onClearRoute,
  onOpenRoutePlanner,
  isFavorite,
  onToggleFavorite,
  onOpenDetails
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const routeMarkersLayerRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(null);

  // Filter locations by category
  const filteredLocations = selectedCategory === "all"
    ? CAMPUS_LOCATIONS
    : CAMPUS_LOCATIONS.filter((loc) => loc.category === selectedCategory);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: CAMPUS_INFO.center,
          zoom: CAMPUS_INFO.defaultZoom,
          zoomControl: false,
          maxZoom: 19,
          minZoom: 14
        });

        // Add Zoom Control at bottom right
        L.control.zoom({ position: "bottomright" }).addTo(map);

        // OpenStreetMap Tile Layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);

        // Marker layer group
        markersLayerRef.current = L.layerGroup().addTo(map);
        routeMarkersLayerRef.current = L.layerGroup().addTo(map);

        mapInstanceRef.current = map;
        setMapReady(true);
      }
    } catch (err) {
      console.error("Leaflet Map init error:", err);
      setMapError("Could not initialize interactive map. Standard listing available below.");
    }

    return () => {
      // In Vite React 19 fast-refresh, map instance can be maintained
    };
  }, []);

  // Invalidate map size whenever view becomes active or container resizes
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 200);
    }
  }, [mapReady]);

  // Update Markers when filteredLocations or selectedLocation changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredLocations.forEach((location) => {
      if (!location.coordinates || location.coordinates.length !== 2) return;

      const isSelected = selectedLocation && selectedLocation.id === location.id;

      // Custom HTML Marker using DivIcon
      const markerHtml = `
        <div class="marker-wrapper ${isSelected ? "selected" : ""}" id="marker-${location.id}">
          <div class="marker-pulse"></div>
          <div class="marker-bubble">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <span class="marker-label-tag">${location.code}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-campus-pin",
        html: markerHtml,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -22]
      });

      const marker = L.marker(location.coordinates, { icon: customIcon });

      // Custom Leaflet Popup Content
      const popupHtml = `
        <div class="campus-popup-card">
          <div class="popup-category-badge">${location.categoryName}</div>
          <h4 class="popup-title">${location.name}</h4>
          <p class="popup-desc">${location.shortDesc}</p>
          <div class="popup-actions">
            <button class="popup-btn popup-btn-outline" id="popup-details-${location.id}">View Info</button>
            <button class="popup-btn popup-btn-primary" id="popup-route-${location.id}">Directions</button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 280, closeButton: false });

      // On click marker
      marker.on("click", () => {
        onSelectLocation(location);
      });

      // Bind actions inside popup when opened
      marker.on("popupopen", () => {
        const detailsBtn = document.getElementById(`popup-details-${location.id}`);
        const routeBtn = document.getElementById(`popup-route-${location.id}`);

        if (detailsBtn) {
          detailsBtn.onclick = () => onOpenDetails(location);
        }
        if (routeBtn) {
          routeBtn.onclick = () => onOpenRoutePlanner(location);
        }
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [filteredLocations, selectedLocation, onSelectLocation, onOpenDetails, onOpenRoutePlanner]);

  // Handle selected location focus
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedLocation) return;
    if (selectedLocation.coordinates) {
      mapInstanceRef.current.flyTo(selectedLocation.coordinates, 17, {
        animate: true,
        duration: 0.8
      });
    }
  }, [selectedLocation]);

  // Handle Active Route Rendering (Polyline & Start/End Markers)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear previous route polyline
    if (routePolylineRef.current) {
      mapInstanceRef.current.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }
    if (routeMarkersLayerRef.current) {
      routeMarkersLayerRef.current.clearLayers();
    }

    if (activeRoute && activeRoute.pathCoordinates && activeRoute.pathCoordinates.length > 1) {
      // Create glowing multi-layered polyline
      const polyline = L.polyline(activeRoute.pathCoordinates, {
        color: "#1d4ed8",
        weight: 6,
        opacity: 0.85,
        lineCap: "round",
        lineJoin: "round",
        dashArray: "1, 10"
      }).addTo(mapInstanceRef.current);

      routePolylineRef.current = polyline;

      // Origin Pin Marker (Green)
      const startCoord = activeRoute.pathCoordinates[0];
      const startPinHtml = `
        <div class="route-marker-pin origin" title="Starting Point">A</div>
      `;
      const startIcon = L.divIcon({
        className: "custom-route-pin",
        html: startPinHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      L.marker(startCoord, { icon: startIcon }).addTo(routeMarkersLayerRef.current);

      // Destination Pin Marker (Rose)
      const endCoord = activeRoute.pathCoordinates[activeRoute.pathCoordinates.length - 1];
      const destPinHtml = `
        <div class="route-marker-pin dest" title="Destination">B</div>
      `;
      const destIcon = L.divIcon({
        className: "custom-route-pin",
        html: destPinHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      L.marker(endCoord, { icon: destIcon }).addTo(routeMarkersLayerRef.current);

      // Fit bounds with padding so full route is visible
      const bounds = L.latLngBounds(activeRoute.pathCoordinates);
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 17,
        animate: true
      });
    }
  }, [activeRoute]);

  // Reset to campus center
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(CAMPUS_INFO.center, CAMPUS_INFO.defaultZoom, {
        animate: true,
        duration: 0.7
      });
    }
  };

  return (
    <div className="map-view-container">
      {/* Map Control & Filter Pill Strip */}
      <div className="map-control-bar">
        <div className="map-pills-scroll" role="toolbar" aria-label="Category Filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`map-filter-pill ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="map-tools">
          <button 
            className="map-tool-btn"
            onClick={handleRecenter}
            title="Recenter Campus Center"
          >
            <Crosshair size={15} />
            <span>Center Campus</span>
          </button>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="map-canvas-wrapper">
        <div 
          ref={mapContainerRef} 
          className="map-leaflet-box"
          id="campus-leaflet-canvas"
        />

        {/* Map Loading State */}
        {!mapReady && !mapError && (
          <div className="map-loading-overlay">
            <div className="spinner"></div>
            <p>Loading interactive campus cartography...</p>
          </div>
        )}

        {/* Map Error Fallback */}
        {mapError && (
          <div className="map-loading-overlay">
            <AlertTriangle size={32} color="#f59e0b" />
            <p>{mapError}</p>
          </div>
        )}

        {/* Active Route Floating Banner */}
        {activeRoute && (
          <div className="map-active-route-banner">
            <div className="route-banner-info">
              <Navigation size={18} color="#60a5fa" />
              <span>
                <strong>{activeRoute.startLocation.code}</strong> ➔ <strong>{activeRoute.endLocation.code}</strong>
              </span>
              <span className="route-stat-tag">{activeRoute.distanceText}</span>
              <span className="route-stat-tag">{activeRoute.walkingMinutes} min walk</span>
            </div>
            <button 
              className="route-clear-btn"
              onClick={onClearRoute}
              title="Clear Active Route"
            >
              <X size={15} />
              <span>Clear</span>
            </button>
          </div>
        )}

        {/* Selected Location Bottom Drawer */}
        {selectedLocation && (
          <div className="map-selected-drawer">
            <div className="drawer-header">
              <div>
                <div className="drawer-badge-group">
                  <span className="popup-category-badge">{selectedLocation.categoryName}</span>
                  <span className="autocomplete-code">{selectedLocation.code}</span>
                </div>
                <h3 className="drawer-title">{selectedLocation.name}</h3>
              </div>
              <button 
                className="drawer-close-btn"
                onClick={() => onSelectLocation(null)}
                aria-label="Close location drawer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="drawer-desc">{selectedLocation.shortDesc}</p>

            <div className="drawer-actions">
              <button 
                className="btn-card-details"
                onClick={() => onOpenDetails(selectedLocation)}
              >
                <Info size={15} />
                <span>Full Details & Floors</span>
              </button>

              <button 
                className="btn-card-route"
                onClick={() => onOpenRoutePlanner(selectedLocation)}
              >
                <Navigation size={15} />
                <span>Get Directions</span>
              </button>

              <button 
                className={`card-favorite-btn ${isFavorite(selectedLocation.id) ? "favorited" : ""}`}
                onClick={() => onToggleFavorite(selectedLocation)}
                title={isFavorite(selectedLocation.id) ? "Remove from Saved" : "Save location"}
                aria-label="Toggle favourite"
              >
                <Bookmark size={18} fill={isFavorite(selectedLocation.id) ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
