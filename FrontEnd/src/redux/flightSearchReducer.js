import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureCity: "",
  arrivalCity: "",
  departureDate: "",
  returnDate: "",
  travelers: 1,
  city: "",
};
function setInput(string) {
  return string.split(" ").join("-").toLowerCase();
}
const searchFlightSlice = createSlice({
  name: "searchFlight",
  initialState,
  reducers: {
    setSearchFlight: (state, action) => {
      const {
        departureCity,
        arrivalCity,
        departureDate,
        returnDate,
        travelers,
        city,
      } = action.payload;
      state.departureCity = departureCity;
      state.arrivalCity = arrivalCity;
      state.departureDate = departureDate;
      state.returnDate = returnDate;
      state.travelers = +travelers;
      state.city = city;
    },
  },
});

export const { setSearchFlight } = searchFlightSlice.actions;
export default searchFlightSlice.reducer;
