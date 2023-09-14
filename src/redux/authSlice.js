import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  // user: { email: "", password: "" },
  user: { email: "", name: "", uid: "", photoURL: null },
};
export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    createUser(state, { payload }) {
      state.user = payload;
      // state.user.email = payload.email;
      // state.user.password = payload.password;
    },
    logIn(state, { payload }) {
      state.user = payload;
    },
    updateUserAvatar(state, { payload }) {
      state.user.photoURL = payload;
    },
    logOut(state) {
      state.user = { email: "", name: "", uid: "", photoURL: null };
    },
  },
});

export const { createUser, logIn, logOut, updateUserAvatar } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
