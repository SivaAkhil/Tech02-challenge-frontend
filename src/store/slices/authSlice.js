import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  token: null,
  userData: null,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLogged = true;
    },

    logout(state, action) {
      state.isLogged = false;
    },

    setUserData(state, action) {
      state.userData = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { login, logout, setToken, setUserData } = slice.actions;

export default slice.reducer;
