// store/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flight: null,
  hasFlight: false,
  hasHotel: false,
  hotel: null,
  departureDate: "none",
  returnDate: "none",
  checkIn: "none",
  checkOut: "none",
  hasGuide: false,
  city: "",
  guides: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPackage(state, action) {
      console.log(action.payload);
      const { flight, hotel, fromDate, toDate } = action.payload;
      state.flight = flight;
      state.hotel = hotel;
      state.hasHotel = true;
      state.hasFlight = true;
      state.checkIn = fromDate;
      state.checkOut = toDate;
      state.departureDate = fromDate;
      state.returnDate = toDate;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setFlight(state, action) {
      const { flight, departureDate, returnDate, city } = action.payload;
      state.flight = flight;
      state.hasFlight = true;
      state.departureDate = departureDate;
      state.returnDate = returnDate;
      state.city = city;
    },

    setHotel(state, action) {
      const { hotel, checkIn, checkOut, city } = action.payload;
      state.hotel = hotel;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.city = city;
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
      state.guides = state.guides.filter((g) => g.guide_id !== action.payload);
    },
    removeAllGuides(state, action) {
      state.guides = [];
    },
    clearBooking(state) {
      state = { ...initialState };
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
  removeAllGuides,
  setCity,
} = bookingSlice.actions;

export default bookingSlice.reducer;
