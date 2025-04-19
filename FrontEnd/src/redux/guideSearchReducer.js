import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  city: "",
};
function setInput(string) {
  return string.split(" ").join("-").toLowerCase();
}
const searchGuideSlice = createSlice({
  name: "searchGuide",
  initialState,
  reducers: {
    setSearchGuide: (state, action) => {
      const { date, city } = action.payload;
      state.city = setInput(city);
      state.date = date;
    },
  },
});

export const { setSearchGuide } = searchGuideSlice.actions;
export default searchGuideSlice.reducer;
