import { configureStore } from "@reduxjs/toolkit";
import searchFlightReducer from "./redux/flightSearchReducer";
import searchGuideReducer from "./redux/guideSearchReducer";
import searchHotelReducer from "./redux/hotelSearchReducer";
const store = configureStore({
  reducer: {
    searchFlight: searchFlightReducer,
    searchGuide: searchGuideReducer,
    searchHotel: searchHotelReducer,
  },
});
export default store;
