// store/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flight: null,
  hasFlight: false,
  hasHotel: false,
  hotel: null,
  departureDate: "",
  returnDate: "",
  checkIn: "",
  checkOut: "",
  hasGuide: false,
  city: "",
  guides: [],
  travellers: 1,
};

// const bookingSlice = createSlice({
//   name: "booking",
//   initialState,
//   reducers: {
//     setPackage(state, action) {
//       console.log(action.payload);
//       const { flight, hotel, fromDate, toDate, travellers } = action.payload;
//       state.flight = flight;
//       state.hotel = hotel;
//       state.hasHotel = true;
//       state.hasFlight = true;
//       state.checkIn = fromDate;
//       state.checkOut = toDate;
//       state.departureDate = fromDate;
//       state.returnDate = toDate;
//       state.travellers = travellers;
//     },
//     setCity(state, action) {
//       state.city = action.payload;
//     },
//     setFlight(state, action) {
//       const { flight, departureDate, returnDate, city, travellers } =
//         action.payload;
//       state.flight = flight;
//       state.hasFlight = true;
//       state.departureDate = departureDate;
//       state.returnDate = returnDate;
//       state.travellers = action.travellers;
//       state.city = city;
//     },

//     setHotel(state, action) {
//       const { hotel, checkIn, checkOut, city } = action.payload;
//       state.hotel = hotel;
//       state.checkIn = checkIn;
//       state.checkOut = checkOut;
//       state.city = city;
//       state.hasHotel = true;
//     },
//     setTraveller(state, action) {
//       state.travellers = action.payload;
//     },
//     addGuide(state, action) {
//       const exists = state.guides.find(
//         (g) => g.guide_daily_site_id === action.payload.guide_daily_site_id
//       );
//       if (!exists) {
//         state.guides.push(action.payload);
//       }
//     },
//     setGuide(state, action) {
//       state.hasGuide = action.payload;
//     },
//     removeGuide(state, action) {
//       state.guides = state.guides.filter(
//         (g) => g.guide_daily_site_id !== action.payload
//       );
//     },
//     removeAllGuides(state, action) {
//       state.guides = [];
//     },
//     clearBooking(state) {
//       state = { ...initialState };
//     },
//   },
// });
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPackage(state, action) {
      console.log(action.payload);
      const { flight, hotel, fromDate, toDate, travellers } = action.payload;
      state.flight = flight;
      state.hotel = hotel;
      state.hasHotel = true;
      state.hasFlight = true;
      state.checkIn = fromDate;
      state.checkOut = toDate;
      state.departureDate = fromDate;
      state.returnDate = toDate;
      state.travellers = travellers;
    },

    setCity(state, action) {
      state.city = action.payload;
    },

    setFlight(state, action) {
      const { flight, departureDate, returnDate, city, travellers } =
        action.payload;

      // Reset hotel-related data to initial state
      state.hotel = initialState.hotel;
      state.hasHotel = initialState.hasHotel;
      state.checkIn = initialState.checkIn;
      state.checkOut = initialState.checkOut;

      // Set flight-related data
      state.flight = flight;
      state.hasFlight = true;
      state.departureDate = departureDate;
      state.returnDate = returnDate;
      state.travellers = travellers;
      state.city = city;
    },

    setHotel(state, action) {
      const { hotel, checkIn, checkOut, city } = action.payload;

      // Reset flight-related data to initial state
      state.flight = initialState.flight;
      state.hasFlight = initialState.hasFlight;
      state.departureDate = initialState.departureDate;
      state.returnDate = initialState.returnDate;

      // Set hotel-related data
      state.hotel = hotel;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.city = city;
      state.hasHotel = true;
    },

    setTraveller(state, action) {
      state.travellers = action.payload;
    },

    addGuide(state, action) {
      const exists = state.guides.find(
        (g) => g.guide_daily_site_id === action.payload.guide_daily_site_id
      );
      if (!exists) {
        state.guides.push(action.payload);
      }
    },

    setGuide(state, action) {
      state.hasGuide = action.payload;
    },

    removeGuide(state, action) {
      state.guides = state.guides.filter(
        (g) => g.guide_daily_site_id !== action.payload
      );
    },

    removeAllGuides(state) {
      state.guides = [];
    },

    clearBooking(state) {
      Object.assign(state, initialState);
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
  setTraveller,
} = bookingSlice.actions;

export default bookingSlice.reducer;
/*
  const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPackage(state, action) {
      console.log(action.payload);
      const { flight, hotel, fromDate, toDate, travellers } = action.payload;
      state.flight = flight;
      state.hotel = hotel;
      state.hasHotel = true;
      state.hasFlight = true;
      state.checkIn = fromDate;
      state.checkOut = toDate;
      state.departureDate = fromDate;
      state.returnDate = toDate;
      state.travellers = travellers;
    },

    setCity(state, action) {
      state.city = action.payload;
    },

    setFlight(state, action) {
      const { flight, departureDate, returnDate, city, travellers } = action.payload;

      // Reset hotel-related data to initial state
      state.hotel = initialState.hotel;
      state.hasHotel = initialState.hasHotel;
      state.checkIn = initialState.checkIn;
      state.checkOut = initialState.checkOut;

      // Set flight-related data
      state.flight = flight;
      state.hasFlight = true;
      state.departureDate = departureDate;
      state.returnDate = returnDate;
      state.travellers = travellers;
      state.city = city;
    },

    setHotel(state, action) {
      const { hotel, checkIn, checkOut, city } = action.payload;

      // Reset flight-related data to initial state
      state.flight = initialState.flight;
      state.hasFlight = initialState.hasFlight;
      state.departureDate = initialState.departureDate;
      state.returnDate = initialState.returnDate;

      // Set hotel-related data
      state.hotel = hotel;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.city = city;
      state.hasHotel = true;
    },

    setTraveller(state, action) {
      state.travellers = action.payload;
    },

    addGuide(state, action) {
      const exists = state.guides.find(
        (g) => g.guide_daily_site_id === action.payload.guide_daily_site_id
      );
      if (!exists) {
        state.guides.push(action.payload);
      }
    },

    setGuide(state, action) {
      state.hasGuide = action.payload;
    },

    removeGuide(state, action) {
      state.guides = state.guides.filter(
        (g) => g.guide_daily_site_id !== action.payload
      );
    },

    removeAllGuides(state) {
      state.guides = [];
    },

    clearBooking(state) {
      Object.assign(state, initialState);
    },
  },
});
*/
