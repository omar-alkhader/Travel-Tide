import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureCity: "",
  arrivalCity: "",
  travellers: 1,
  nights: "",
  departureDate: "",
  hasGuide: false,
  returnDate: "",
  city: "",
};
const searchPackageSlice = createSlice({
  name: "searchPackage",
  initialState,
  reducers: {
    setSearchPackage: (state, action) => {
      const {
        departureCity,
        departureDate,
        arrivalCity,
        travellers,
        nights,
        hasGuide,
        returnDate,
        city,
      } = action.payload;
      state.departureCity = departureCity;
      state.arrivalCity = arrivalCity;
      state.hasGuide = hasGuide;
      state.nights = nights;
      state.travellers = travellers;
      state.departureDate = departureDate;
      state.returnDate = returnDate;
      state.city = city;
    },
  },
});

export const { setSearchPackage } = searchPackageSlice.actions;
export default searchPackageSlice.reducer;
