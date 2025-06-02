// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedGuide = localStorage.getItem("guide");

const initialState = {
  guide: storedGuide ? JSON.parse(storedGuide) : null,
};

const guideSlice = createSlice({
  name: "guide",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.guide = action.payload;
      localStorage.setItem("guide", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.guide = null;
      localStorage.removeItem("guide");
    },
  },
});

export const { loginSuccess, logout } = guideSlice.actions;
export default guideSlice.reducer;
