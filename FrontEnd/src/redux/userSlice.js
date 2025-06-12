// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedType = localStorage.getItem("userType");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  role: storedType ? storedType : "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, role } = action.payload;
      state.user = user;
      state.role = role;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", role);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
