// Geolocation utility functions for distance calculation & duplicate detection

/**
 * Calculate distance between two lat/lng coordinates in meters using the Haversine formula
 */
export function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distance in meters
}

/**
 * Detect potential duplicate or nearby reports within a radius (default 50 meters)
 * Filters by matching category or nearby active status
 */
export function findNearbyReports(targetReport, allReports, radiusMeters = 50) {
  if (!targetReport || !targetReport.lat || !targetReport.lng) return [];

  return allReports
    .filter((r) => {
      // Don't compare with itself
      if (r.id === targetReport.id) return false;
      // Exclude rejected reports
      if (r.status === 'rejected') return false;

      const dist = calculateDistanceMeters(
        targetReport.lat,
        targetReport.lng,
        r.lat,
        r.lng
      );

      return dist <= radiusMeters;
    })
    .map((r) => ({
      ...r,
      distanceMeters: calculateDistanceMeters(
        targetReport.lat,
        targetReport.lng,
        r.lat,
        r.lng
      ),
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}
