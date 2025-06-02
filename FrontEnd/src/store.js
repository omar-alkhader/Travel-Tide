import { configureStore } from "@reduxjs/toolkit";
import searchFlightReducer from "./redux/flightSearchReducer";
import searchGuideReducer from "./redux/guideSearchReducer";
import searchHotelReducer from "./redux/hotelSearchReducer";
import searchPackageReducer from "./redux/packageSearch";
import userSlice from "./redux/userSlice";
import guideSlice from "./redux/guideSlice";
import bookingSlice from "./redux/bookingSlice";
const store = configureStore({
  reducer: {
    searchFlight: searchFlightReducer,
    searchGuide: searchGuideReducer,
    searchHotel: searchHotelReducer,
    user: userSlice,
    searchPackage: searchPackageReducer,
    booking: bookingSlice,
    guide: guideSlice,
  },
});
export default store;
