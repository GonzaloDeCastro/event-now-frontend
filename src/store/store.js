import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/filterSlice";
import authReducer from "../redux/authSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    auth: authReducer,
  },
});
