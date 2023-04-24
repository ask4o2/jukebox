import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  acessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateAccessToken } = userSlice.actions;

export default userSlice.reducer;
