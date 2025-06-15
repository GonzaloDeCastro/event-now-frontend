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

export const getMyCreatedEvents = createAsyncThunk(
  "events/getMyCreatedEvents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/events/by-organizer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // asumimos que es un array de eventos
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Unknown error" }
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
    myCreatedEvents: [], // nuevo
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
      })
      .addCase(getMyCreatedEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyCreatedEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.myCreatedEvents = action.payload; // deberías agregar `myCreatedEvents` al initialState
      })
      .addCase(getMyCreatedEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEventError, clearEventSuccess } = eventSlice.actions;
export default eventSlice.reducer;
