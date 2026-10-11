// Campus Navigator - Campus Pathway Routing Engine
// Computes walking paths, distances, times, and step-by-step directions along campus walkways

import { CAMPUS_LOCATIONS } from "./campusData";

// Campus pathway intersection hubs (walkway junctions)
export const PATHWAY_WAYPOINTS = {
  // Northern Promenade
  "junction-north": [37.4315, -122.1690],
  "junction-northwest": [37.4310, -122.1715],
  "junction-tech": [37.4300, -122.1720],
  // Central Campus Spine
  "junction-quad-north": [37.4288, -122.1690],
  "junction-quad-center": [37.4278, -122.1700],
  "junction-quad-south": [37.4265, -122.1690],
  // Eastern Academic Loop
  "junction-east-lecture": [37.4285, -122.1670],
  "junction-sports-walk": [37.4260, -122.1650],
  // Western Student Loop
  "junction-west-admin": [37.4280, -122.1712],
  "junction-health-dorm": [37.4245, -122.1715],
  // Southern Gateway
  "junction-south": [37.4245, -122.1690]
};

// Calculate Haversine distance between two coordinates [lat, lng] in meters
export function calculateDistance(coord1, coord2) {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Format meters into clean human readable string
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${meters} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
}

// Estimate walking time in minutes
export function calculateWalkingTime(meters, speedMetersPerMin = 75) {
  const minutes = Math.max(1, Math.round(meters / speedMetersPerMin));
  return minutes;
}

// Generate intermediate pathway coordinates between two campus buildings
function buildPathCoordinates(startLoc, endLoc, isAccessible = false) {
  const startCoord = startLoc.coordinates;
  const endCoord = endLoc.coordinates;
  const path = [startCoord];

  // Route logic connecting through campus promenade nodes
  const midLat = (startCoord[0] + endCoord[0]) / 2;
  const midLng = (startCoord[1] + endCoord[1]) / 2;

  // Quad center waypoint provides realistic collegiate path routing
  const quadCenter = [37.4278, -122.1700];
  const northJunction = [37.4310, -122.1695];
  const southJunction = [37.4250, -122.1695];

  // Determine key intermediate nodes based on north/south/east/west orientation
  if (startCoord[0] > 37.4300 && endCoord[0] < 37.4260) {
    // North to south traversal
    path.push(northJunction);
    path.push(quadCenter);
    path.push(southJunction);
  } else if (startCoord[0] < 37.4260 && endCoord[0] > 37.4300) {
    // South to north traversal
    path.push(southJunction);
    path.push(quadCenter);
    path.push(northJunction);
  } else {
    // Standard traversal: slight offset along campus sidewalk
    const waypointOffset = [
      Number((midLat + (isAccessible ? 0.0001 : 0.00005)).toFixed(6)),
      Number((midLng + (isAccessible ? -0.0001 : 0.0001)).toFixed(6))
    ];
    path.push(waypointOffset);
  }

  path.push(endCoord);
  return path;
}

// Generate step-by-step navigation instructions
function generateDirections(startLoc, endLoc, totalMeters, isAccessible) {
  const steps = [];
  const accessNote = isAccessible ? " (Using step-free accessible ramp pathway)" : "";

  // Step 1: Departure
  steps.push({
    step: 1,
    instruction: `Depart from ${startLoc.name} (${startLoc.code}).`,
    detail: `Head along the main pedestrian promenade towards the campus quadrangle${accessNote}.`,
    distance: Math.round(totalMeters * 0.25),
    icon: "Navigation"
  });

  // Step 2: Waypoint cues
  if (totalMeters > 300) {
    steps.push({
      step: 2,
      instruction: "Continue along Central Campus Promenade.",
      detail: "Pass the open greenery and central student bulletin board. Shaded benches on your side.",
      distance: Math.round(totalMeters * 0.35),
      icon: "Footprints"
    });
  }

  // Step 3: Directional turn
  steps.push({
    step: steps.length + 1,
    instruction: `Turn towards the ${endLoc.categoryName || "target"} sector.`,
    detail: isAccessible
      ? `Follow the wide gently-sloped pavement (gradient < 5%) directly to the entry plaza.`
      : `Take the paved courtyard path leading straight to the main concourse.`,
    distance: Math.round(totalMeters * 0.25),
    icon: "CornerDownRight"
  });

  // Final Step: Arrival
  steps.push({
    step: steps.length + 1,
    instruction: `Arrive at ${endLoc.name}.`,
    detail: `Main entry doors are ahead. ${endLoc.accessibility || "Accessible doors on ground level."}`,
    distance: Math.round(totalMeters * 0.15),
    icon: "MapPin"
  });

  return steps;
}

// Main route generation function
export function calculateRoute(startId, endId, isAccessible = false) {
  if (!startId || !endId || startId === endId) {
    return null;
  }

  const startLoc = CAMPUS_LOCATIONS.find((loc) => loc.id === startId);
  const endLoc = CAMPUS_LOCATIONS.find((loc) => loc.id === endId);

  if (!startLoc || !endLoc) {
    return null;
  }

  // Pathway coordinates
  const pathCoordinates = buildPathCoordinates(startLoc, endLoc, isAccessible);

  // Calculate cumulative distance along path
  let totalDistanceMeters = 0;
  for (let i = 0; i < pathCoordinates.length - 1; i++) {
    totalDistanceMeters += calculateDistance(pathCoordinates[i], pathCoordinates[i + 1]);
  }

  // Slightly penalize step-free route length for realistic detour around staircases
  if (isAccessible) {
    totalDistanceMeters = Math.round(totalDistanceMeters * 1.08);
  }

  const walkingMinutes = calculateWalkingTime(totalDistanceMeters, isAccessible ? 65 : 75);
  const estimatedSteps = Math.round(totalDistanceMeters * 1.3);
  const caloriesBurned = Math.round(totalDistanceMeters * 0.05);

  const steps = generateDirections(startLoc, endLoc, totalDistanceMeters, isAccessible);

  return {
    startLocation: startLoc,
    endLocation: endLoc,
    distanceMeters: totalDistanceMeters,
    distanceText: formatDistance(totalDistanceMeters),
    walkingMinutes,
    estimatedSteps,
    caloriesBurned,
    isAccessible,
    pathCoordinates,
    steps,
    calculatedAt: new Date().toISOString()
  };
}
