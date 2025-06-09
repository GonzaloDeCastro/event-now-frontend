import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config";

// Async thunk to create a new event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async ({ eventData, token }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // success message or created event
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Event creation failed"
      );
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearEventError: (state) => {
      state.error = null;
    },
    clearEventSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload.message || "Event created successfully";
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEventError, clearEventSuccess } = eventSlice.actions;
export default eventSlice.reducer;
