import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Registration failed"
      );
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);
      const { token } = response.data;

      // Save the token in localStorage
      localStorage.setItem("authToken", token);

      return response.data.user; // Only return user info to Redux
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Login failed"
      );
    }
  }
);

export const fetchUserFromToken = createAsyncThunk(
  "auth/fetchUserFromToken",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Invalid or expired token");
    }
  }
);

// Auth slice definition
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Stores the logged-in user info
    loading: false, // True during async operations
    error: null, // Stores error messages
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user flow
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login user flow
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserFromToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserFromToken.rejected, (state) => {
        state.user = null;
      });
  },
});

// Export actions and reducer
export const { clearAuthError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
