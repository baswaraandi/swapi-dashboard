import { configureStore, createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    selectedPerson: null,
    selectedFilm: null,
    selectedPlanet: null,
    selectedSpecies: null,
    selectedStarship: null,
    activeFilter: "ALL",
    searchTerm: "",
  },
  reducers: {
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
    setSelectedFilm: (state, action) => {
      state.selectedFilm = action.payload;
    },
    setSelectedPlanet: (state, action) => {
      state.selectedPlanet = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSpecies: (state, action) => {
      state.selectedSpecies = action.payload;
    },
    setSelectedStarship: (state, action) => {
      state.selectedStarship = action.payload;
    },
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

// 2. EXPORT setFilter dari actions
export const {
  setSelectedPerson,
  setSelectedFilm,
  setSelectedPlanet,
  setSearchTerm,
  setSelectedSpecies,
  setSelectedStarship,
  setFilter,
} = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});