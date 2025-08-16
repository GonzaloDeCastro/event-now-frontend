// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../config"; // mismo alias que usás en otros slices

const initialState = {
  user: null, // logged-in user info
  loading: false, // async flag
  error: null, // error messages
  successMessage: null, // opcional (útil para UI feedback)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Flags & messages
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload || null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setSuccess: (state, action) => {
      state.successMessage = action.payload || null;
    },
    clearAuthSuccess: (state) => {
      state.successMessage = null;
    },

    // Data
    setUser: (state, action) => {
      state.user = action.payload || null;
    },

    // Logout
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const {
  setLoading,
  setError,
  clearAuthError,
  setSuccess,
  clearAuthSuccess,
  setUser,
  logoutUser,
} = authSlice.actions;

/* ===========================
   Thunks (axios + simple flow)
   =========================== */

/**
 * Register user (saves token and sets user on success)
 * @param {Object} userData
 */
export const registerUserAPI = (userData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearAuthError());
    dispatch(clearAuthSuccess());

    try {
      const res = await axios.post(`${API}/users/register`, userData);

      if (res?.status === 200 || res?.status === 201) {
        const { token, user, message } = res.data || {};
        if (token) localStorage.setItem("authToken", token);
        dispatch(setUser(user || null));
        dispatch(setSuccess(message || "Registration successful"));
      } else {
        dispatch(setError(`Unexpected status: ${res?.status || "unknown"}`));
      }
    } catch (err) {
      const apiErr =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";
      dispatch(setError(apiErr));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

/**
 * Login user (saves token and sets user on success)
 * @param {Object} credentials { email, password }
 */
export const loginUserAPI = (credentials) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearAuthError());
    dispatch(clearAuthSuccess());

    try {
      const res = await axios.post(`${API}/users/login`, credentials);

      if (res?.status === 200) {
        const { token, user, message } = res.data || {};
        if (token) localStorage.setItem("authToken", token);
        dispatch(setUser(user || null));
        dispatch(setSuccess(message || "Login successful"));
      } else {
        dispatch(setError(`Unexpected status: ${res?.status || "unknown"}`));
      }
    } catch (err) {
      const apiErr =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      dispatch(setError(apiErr));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

/**
 * Fetch user from stored token (invalid -> clears user & token)
 */
export const fetchUserFromTokenAPI = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearAuthError());

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(setUser(null));
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(`${API}/users/me`, { headers });

      if (res?.status === 200) {
        dispatch(setUser(res.data || null));
      } else {
        dispatch(setUser(null));
        localStorage.removeItem("authToken");
        dispatch(setError("Invalid session"));
      }
    } catch (err) {
      dispatch(setUser(null));
      localStorage.removeItem("authToken");
      const apiErr =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid or expired token";
      dispatch(setError(apiErr));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export default authSlice.reducer;
