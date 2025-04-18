import { configureStore } from "@reduxjs/toolkit";
import searchFlightReducer from "./redux/flightSearchReducer";
import searchGuideReducer from "./redux/guideSearchReducer";
const store = configureStore({
  reducer: {
    searchFlight: searchFlightReducer,
    searchGuide: searchGuideReducer,
  },
});
export default store;
