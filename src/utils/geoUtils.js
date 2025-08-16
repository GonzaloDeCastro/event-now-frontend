// geoUtils.js

/**
 * Reverse-geocode lat/lng and return the best "city-like" name.
 * Uses OpenStreetMap Nominatim (no API key).
 *
 * @param {number} lat
 * @param {number} lng
 * @param {{ language?: string }} [opts]
 * @returns {Promise<string>} city name or "" if not found
 */
export async function getCityFromCoords(lat, lng, opts = {}) {
  const { language = "es-AR" } = opts;

  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("zoom", "14"); // city-level
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url.toString(), {
    headers: { "Accept-Language": language },
  });
  if (!res.ok) return "";

  const data = await res.json();
  const a = data?.address || {};

  // Pick the best available "city-like" field
  const city =
    a.city ||
    a.town ||
    a.village ||
    a.municipality ||
    a.city_district || // e.g. "Comuna 1" in CABA (si querés evitarlo, removelo)
    a.suburb ||
    a.hamlet ||
    a.locality ||
    "";

  return city || "";
}
