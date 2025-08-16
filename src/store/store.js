import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/filterSlice";
import authReducer from "../redux/authSlice";
import eventReducer from "../redux/eventSlice";
import locationReducer from "../redux/locationSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    auth: authReducer,
    events: eventReducer,
    location: locationReducer,
  },
});
