import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  checkIn: "",
  checkOut: "",
  nights: 1,
  travellers: 1,
};
function setInput(string) {
  return string.split(" ").join("-").toLowerCase();
}
const searchHotelSlice = createSlice({
  name: "searchHotel",
  initialState,
  reducers: {
    setSearchHotel: (state, action) => {
      const { city, checkIn, checkOut, nights, travellers } = action.payload;
      state.city = city;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.nights = +nights;
      state.travellers = travellers || initialState.travellers;
    },
  },
});

export const { setSearchHotel } = searchHotelSlice.actions;
export default searchHotelSlice.reducer;
