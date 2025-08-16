// AddressAutocomplete.jsx
import { useEffect, useRef, useState } from "react";

export default function AddressAutocomplete({
  value,
  onSelect,
  onClear, // NUEVO
  placeholder = "Dirección",
  countryCodes = "ar",
  proximity = null,
  radiusKm = 25,
  contextCity = "",
  contextProvince = "",
}) {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const abortRef = useRef(null);
  const containerRef = useRef(null);

  // Sync externo -> interno
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const computeBBox = (lat, lng, km) => {
    const dLat = km / 111;
    const dLon = km / (111 * Math.cos((lat * Math.PI) / 180));
    const latN = lat + dLat;
    const latS = lat - dLat;
    const lonE = lng + dLon;
    const lonW = lng - dLon;
    return { lonW, latN, lonE, latS };
  };

  const buildQueryWithContext = (q) => {
    const parts = [q];
    if (contextCity) parts.push(contextCity);
    if (contextProvince) parts.push(contextProvince);
    return parts.join(" ").trim();
  };

  useEffect(() => {
    if (!query || query.trim().length < 3) {
      setResults([]);
      return;
    }

    const q = buildQueryWithContext(query);
    const trySearch = async (boundedFirst = true) => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      const baseParams = {
        format: "jsonv2",
        addressdetails: "1",
        limit: "6",
        q,
      };
      if (countryCodes) baseParams.countrycodes = countryCodes;

      const doFetch = async (paramsObj) => {
        const url = new URL("https://nominatim.openstreetmap.org/search");
        Object.entries(paramsObj).forEach(([k, v]) =>
          url.searchParams.set(k, String(v))
        );
        const res = await fetch(url.toString(), {
          signal: abortRef.current.signal,
          headers: { "Accept-Language": "es-AR,es;q=0.9" },
        });
        if (!res.ok) throw new Error("Nominatim error");
        return res.json();
      };

      if (boundedFirst && proximity?.lat && proximity?.lng) {
        const { lat, lng } = proximity;
        const { lonW, latN, lonE, latS } = computeBBox(lat, lng, radiusKm);
        const paramsBounded = {
          ...baseParams,
          viewbox: `${lonW},${latN},${lonE},${latS}`,
          bounded: "1",
        };
        const data = await doFetch(paramsBounded);
        if (Array.isArray(data) && data.length > 0) return data;
      }

      return await doFetch(baseParams);
    };

    const t = setTimeout(async () => {
      try {
        const data = await trySearch(true);
        setResults(Array.isArray(data) ? data : []);
        setOpen(true);
      } catch (err) {
        if (err.name !== "AbortError") {
          setResults([]);
          setOpen(false);
        }
      }
    }, 300);

    return () => clearTimeout(t);
  }, [query, countryCodes, proximity, radiusKm, contextCity, contextProvince]);

  const pick = (place) => {
    setQuery(place.display_name);
    setOpen(false);

    const addr = place.address || {};
    const city =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.hamlet ||
      addr.suburb ||
      "";
    const province = addr.state || addr.region || "";

    onSelect?.({
      label: place.display_name,
      lat: Number(place.lat),
      lng: Number(place.lon),
      city,
      province,
      raw: place,
    });
  };

  const handleInputChange = (e) => {
    const next = e.target.value;
    setQuery(next);
    if (next.trim() === "") {
      setResults([]);
      setOpen(false);
      onClear?.(); // <- avisa al padre que vació la dirección
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <input
        className="form-control"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onFocus={() => results.length && setOpen(true)}
      />
      {open && results.length > 0 && (
        <div
          style={{
            position: "absolute",
            zIndex: 1050,
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--bs-body-bg, #fff)",
            border: "1px solid #ced4da",
            borderTop: "none",
            maxHeight: 260,
            overflowY: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,.12)",
          }}
          role="listbox"
        >
          {results.map((r) => (
            <button
              type="button"
              key={r.place_id}
              onClick={() => pick(r)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 12px",
                border: 0,
                background: "transparent",
                cursor: "pointer",
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {r.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
