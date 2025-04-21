import { configureStore } from "@reduxjs/toolkit";
import searchFlightReducer from "./redux/flightSearchReducer";
import searchGuideReducer from "./redux/guideSearchReducer";
import searchHotelReducer from "./redux/hotelSearchReducer";
import userSlice from "./redux/userSlice";
const store = configureStore({
  reducer: {
    searchFlight: searchFlightReducer,
    searchGuide: searchGuideReducer,
    searchHotel: searchHotelReducer,
    user: userSlice,
  },
});
export default store;
