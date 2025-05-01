import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureCity: "",
  arrivalCity: "",
  travellers: "",
  nights: "",
  departureDate: "",
  hasGuide: false,
  returnDate: "",
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
      } = action.payload;
      state.departureCity = departureCity;
      state.arrivalCity = arrivalCity;
      state.hasGuide = hasGuide;
      state.nights = nights;
      state.travellers = travellers;
      state.departureDate = departureDate;
      state.returnDate = returnDate;
    },
  },
});

export const { setSearchPackage } = searchPackageSlice.actions;
export default searchPackageSlice.reducer;
