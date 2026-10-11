import React, { useState, useEffect } from "react";
import { CAMPUS_LOCATIONS } from "../data/campusData";
import { calculateRoute } from "../data/routeGraph";
import { 
  ArrowUpDown, 
  Navigation, 
  MapPin, 
  Footprints, 
  Accessibility, 
  Clock, 
  Flame, 
  CornerDownRight, 
  Map, 
  CheckCircle2, 
  Sparkles,
  RotateCcw
} from "lucide-react";

export default function RoutePlanner({
  initialOriginId = "",
  initialDestinationId = "",
  onRouteCalculated,
  onViewOnMap
}) {
  const [startId, setStartId] = useState(initialOriginId || "gate-north");
  const [destId, setDestId] = useState(initialDestinationId || "lib-01");
  const [isAccessible, setIsAccessible] = useState(false);
  const [routeResult, setRouteResult] = useState(null);

  // Sync with initial props if opened via "Get Directions"
  useEffect(() => {
    if (initialDestinationId) {
      setDestId(initialDestinationId);
    }
    if (initialOriginId) {
      setStartId(initialOriginId);
    }
  }, [initialOriginId, initialDestinationId]);

  // Compute route when inputs or accessible mode changes
  useEffect(() => {
    if (startId && destId && startId !== destId) {
      const res = calculateRoute(startId, destId, isAccessible);
      setRouteResult(res);
      if (onRouteCalculated) {
        onRouteCalculated(res);
      }
    } else {
      setRouteResult(null);
    }
  }, [startId, destId, isAccessible, onRouteCalculated]);

  const handleSwap = () => {
    const temp = startId;
    setStartId(destId);
    setDestId(temp);
  };

  const handleManualCalculate = (e) => {
    e.preventDefault();
    if (startId && destId && startId !== destId) {
      const res = calculateRoute(startId, destId, isAccessible);
      setRouteResult(res);
      if (onRouteCalculated) {
        onRouteCalculated(res);
      }
    }
  };

  return (
    <div className="route-planner-view">
      <div className="route-planner-grid">
        {/* Left Form Panel */}
        <div className="route-form-card">
          <h2 className="route-form-title">Campus Walking Planner</h2>
          <p className="route-form-subtitle">
            Find step-free or standard walking directions between any buildings and entrance gates.
          </p>

          <form onSubmit={handleManualCalculate}>
            <div className="route-inputs-container">
              {/* Origin Field */}
              <div className="route-field-group">
                <label className="route-field-label" htmlFor="route-start-select">
                  <MapPin size={15} color="var(--emerald-600)" />
                  <span>Starting Point</span>
                </label>
                <select
                  id="route-start-select"
                  className="route-select"
                  value={startId}
                  onChange={(e) => setStartId(e.target.value)}
                >
                  <optgroup label="Campus Entrances & Transit">
                    {CAMPUS_LOCATIONS.filter((l) => l.category === "gates").map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.code})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Academic & Facilities">
                    {CAMPUS_LOCATIONS.filter((l) => l.category !== "gates").map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.code})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Swap Button */}
              <button
                type="button"
                className="btn-swap-locations"
                onClick={handleSwap}
                title="Swap Starting Point & Destination"
                aria-label="Swap Starting Point and Destination"
              >
                <ArrowUpDown size={16} />
              </button>

              {/* Destination Field */}
              <div className="route-field-group">
                <label className="route-field-label" htmlFor="route-dest-select">
                  <Navigation size={15} color="var(--blue-600)" />
                  <span>Destination</span>
                </label>
                <select
                  id="route-dest-select"
                  className="route-select"
                  value={destId}
                  onChange={(e) => setDestId(e.target.value)}
                >
                  <optgroup label="Academic & Facilities">
                    {CAMPUS_LOCATIONS.filter((l) => l.category !== "gates").map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.code})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Campus Entrances & Transit">
                    {CAMPUS_LOCATIONS.filter((l) => l.category === "gates").map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.code})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Accessible Route Toggle */}
            <div className="accessible-toggle-row">
              <div className="accessible-label-wrap">
                <Accessibility size={18} color="var(--blue-700)" />
                <div>
                  <div className="accessible-title">Accessible Step-Free Pathway</div>
                  <div className="accessible-hint">Prioritizes ramps and level walkways</div>
                </div>
              </div>

              <label className="switch" aria-label="Toggle accessible step-free route">
                <input
                  type="checkbox"
                  checked={isAccessible}
                  onChange={(e) => setIsAccessible(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            {startId === destId && (
              <p style={{ color: "var(--amber-600)", fontSize: "0.82rem", marginBottom: "1rem" }}>
                Please select two different campus locations to calculate directions.
              </p>
            )}

            <button
              type="submit"
              className="btn-calculate-route"
              disabled={startId === destId}
            >
              <Navigation size={18} />
              <span>Update Walking Route</span>
            </button>
          </form>
        </div>

        {/* Right Route Output Panel */}
        <div className="route-results-column">
          {routeResult ? (
            <>
              {/* Route Summary Overview */}
              <div className="route-summary-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <span className="card-category-tag" style={{ background: "var(--emerald-50)", color: "var(--emerald-700)", borderColor: "var(--emerald-200)" }}>
                      {routeResult.isAccessible ? "Step-Free Accessible Route" : "Standard Campus Walkway"}
                    </span>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginTop: "0.35rem", color: "var(--slate-900)" }}>
                      {routeResult.startLocation.name} ➔ {routeResult.endLocation.name}
                    </h3>
                  </div>

                  <button
                    className="btn-modal-navigate"
                    style={{ flex: "none", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                    onClick={() => onViewOnMap(routeResult)}
                  >
                    <Map size={16} />
                    <span>View on Interactive Map</span>
                  </button>
                </div>

                {/* Key Metrics Stats */}
                <div className="summary-stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">{routeResult.distanceText}</span>
                    <span className="stat-label">Total Distance</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">~{routeResult.walkingMinutes} min</span>
                    <span className="stat-label">Est. Walk Time</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{routeResult.estimatedSteps}</span>
                    <span className="stat-label">Walking Steps</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">~{routeResult.caloriesBurned} kcal</span>
                    <span className="stat-label">Energy Burn</span>
                  </div>
                </div>
              </div>

              {/* Turn-by-Turn Steps */}
              <div className="step-by-step-card">
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--slate-900)" }}>
                  Step-by-Step Navigation
                </h4>

                <div className="steps-list">
                  {routeResult.steps.map((stepItem, idx) => (
                    <div key={idx} className="step-item">
                      <div className="step-indicator">
                        <div className="step-circle">{stepItem.step}</div>
                        {idx < routeResult.steps.length - 1 && (
                          <div className="step-connector-line"></div>
                        )}
                      </div>
                      <div className="step-text-content">
                        <div className="step-instruction">{stepItem.instruction}</div>
                        <div className="step-detail">{stepItem.detail}</div>
                        <span className="step-distance-tag">{stepItem.distance} m</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state-box">
              <div className="empty-icon-box">
                <Navigation size={28} />
              </div>
              <h3 className="empty-title">Select Origin and Destination</h3>
              <p className="empty-desc">
                Choose any two campus locations on the left to see accurate walking distances, accessible paths, and step-by-step instructions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
