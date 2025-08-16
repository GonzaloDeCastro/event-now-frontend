// src/redux/eventsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../config";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
  myCreatedEvents: [],
  allEvents: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload || null;
    },
    setSuccess: (state, action) => {
      state.successMessage = action.payload || null;
    },

    setMyCreatedEvents: (state, action) => {
      state.myCreatedEvents = action.payload || [];
    },
    setAllEvents: (state, action) => {
      state.allEvents = action.payload || [];
    },

    clearEventError: (state) => {
      state.error = null;
    },
    clearEventSuccess: (state) => {
      state.successMessage = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setSuccess,
  setMyCreatedEvents,
  setAllEvents,
  clearEventError,
  clearEventSuccess,
} = eventsSlice.actions;

/** Create a new event (lee token de localStorage) */
export const createEventAPI = (eventData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setSuccess(null));

    try {
      const token = localStorage.getItem("authToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(`${API}/events`, eventData, { headers });

      // Solo éxito si API responde 200/201
      if (res?.status === 200 || res?.status === 201) {
        const msg = res?.data?.message || "Event created successfully";
        dispatch(setSuccess(msg));
        const { data } = await axios.get(`${API}/events/by-organizer`, {
          headers,
        });
        dispatch(setMyCreatedEvents(Array.isArray(data) ? data : []));
      } else {
        dispatch(setError(`Unexpected status: ${res?.status || "unknown"}`));
      }
    } catch (err) {
      const apiErr =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Event creation failed";
      dispatch(setError(apiErr));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getMyCreatedEventsAPI = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const token = localStorage.getItem("authToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      console.log("headers", headers);
      const { data } = await axios.get(`${API}/events/by-organizer`, {
        headers,
      });
      dispatch(setMyCreatedEvents(Array.isArray(data) ? data : []));
    } catch (err) {
      dispatch(setError(err?.response?.data || { error: "Unknown error" }));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getAllEventsAPI = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const { data } = await axios.get(`${API}/events`);
      dispatch(setAllEvents(Array.isArray(data) ? data : []));
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Error fetching events")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export default eventsSlice.reducer;
