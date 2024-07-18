import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  load: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.load = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.load = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.load = false;
    },
    signOutUserStart: (state) => {
      state.load = true;
    },
    signOutUserSuccess: (state, action) => {
      state.currentUser = null;
      state.load = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.load = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
