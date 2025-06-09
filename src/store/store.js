import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/filterSlice";
import authReducer from "../redux/authSlice";
import eventReducer from "../redux/eventSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    auth: authReducer,
    events: eventReducer,
  },
});
