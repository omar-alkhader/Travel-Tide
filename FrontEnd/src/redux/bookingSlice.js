// store/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flight: null,
  hasFlight: false,
  hasHotel: false,
  hotel: null,
  hasGuide: false,
  package: null,
  guides: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPackage(state, action) {
      console.log(action.payload);
      const { flight, hotel } = action.payload;
      state.flight = flight;
      state.hotel = hotel;
      state.hasHotel = true;
      state.hasFlight = true;
    },

    setFlight(state, action) {
      state.flight = action.payload;
      state.hasFlight = true;
    },
    setHotel(state, action) {
      state.hotel = action.payload;
      state.hasHotel = true;
    },
    addGuide(state, action) {
      const exists = state.guides.find((g) => g.id === action.payload.id);
      if (!exists) {
        state.guides.push(action.payload);
      }
    },
    setGuide(state, action) {
      state.hasGuide = action.payload;
    },
    removeGuide(state, action) {
      state.guides = state.guides.filter((g) => g.id !== action.payload);
    },
    clearBooking(state) {
      state.flight = null;
      state.hotel = null;
      state.guides = [];
    },
  },
});

export const {
  setFlight,
  setHotel,
  addGuide,
  removeGuide,
  clearBooking,
  setPackage,
  setGuide,
} = bookingSlice.actions;

export default bookingSlice.reducer;
