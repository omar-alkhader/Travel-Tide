import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
};
function setInput(string) {
  return string.split(" ").join("-").toLowerCase();
}
const searchHotelSlice = createSlice({
  name: "searchHotel",
  initialState,
  reducers: {
    setSearchHotel: (state, action) => {
      const { city, checkIn, checkOut, nights } = action.payload;
      state.city = setInput(city);
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.nights = +nights;
    },
  },
});

export const { setSearchHotel } = searchHotelSlice.actions;
export default searchHotelSlice.reducer;
