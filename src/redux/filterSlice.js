import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  fromDate: "",
  toDate: "",
  category: "", // ej: 'música', 'feria'
  isFree: null, // true / false / null
  ageRestriction: "", // '', '13+', '18+'
  locationType: "", // 'aire libre', 'cerrado'
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
    resetFilters: () => initialState,
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setIsFree: (state, action) => {
      state.isFree = action.payload;
    },
    setAgeRestriction: (state, action) => {
      state.ageRestriction = action.payload;
    },
    setLocationType: (state, action) => {
      state.locationType = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setFromDate,
  setToDate,
  resetFilters,
  setCategory,
  setIsFree,
  setAgeRestriction,
  setLocationType,
} = filterSlice.actions;
export default filterSlice.reducer;
