import { createSlice } from "@reduxjs/toolkit";

const API_LS_KEY = "userLocation.v1";
const TTL_MS = 30 * 60 * 1000; // 30 minutes

// --- Local cache helpers ---
const loadFromCache = () => {
  try {
    const raw = localStorage.getItem(API_LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.coords || !parsed?.lastUpdated) return null;
    const fresh = Date.now() - parsed.lastUpdated < TTL_MS;
    return fresh ? parsed : null;
  } catch {
    return null;
  }
};

const saveToCache = (coords, lastUpdated) => {
  localStorage.setItem(API_LS_KEY, JSON.stringify({ coords, lastUpdated }));
};

const initialFromCache = loadFromCache();

const initialState = {
  loading: false,
  error: null,
  permission: "unknown", // 'granted' | 'denied' | 'prompt' | 'unknown'
  coords: initialFromCache?.coords || null, // { lat, lng, accuracy? }
  lastUpdated: initialFromCache?.lastUpdated || null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload || null;
    },
    clearLocationError: (state) => {
      state.error = null;
    },

    setCoords: (state, action) => {
      state.coords = action.payload || null; // {lat, lng, accuracy?}
    },
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload || null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearLocationError,
  setCoords,
  setLastUpdated,
} = locationSlice.actions;

export default locationSlice.reducer;

/** Try to detect current location (WILL trigger prompt if needed). */
export const detectLocationAPI = () => {
  return async (dispatch) => {
    if (!("geolocation" in navigator)) {
      dispatch(setError("Geolocation is not supported by this browser."));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearLocationError());

    const opts = { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 };

    await new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          const ts = Date.now();
          dispatch(setCoords(coords));
          dispatch(setLastUpdated(ts));
          saveToCache(coords, ts);
          resolve();
        },
        (err) => {
          dispatch(
            setError(
              err?.message || "Unable to retrieve your location right now."
            )
          );
          resolve();
        },
        opts
      );
    });

    dispatch(setLoading(false));
  };
};
