// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload; // Set user data
    },
    logout: (state) => {
      state.user = null; // Clear user on logout
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
