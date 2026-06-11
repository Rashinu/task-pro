import { createSlice } from "@reduxjs/toolkit";
import {
  logIn,
  logOut,
  refreshUser,
  register,
  updateProfile,
  updateTheme,
} from "./authOperations";

const initialState = {
  user: null,
  token: window.localStorage.getItem("taskpro-token"),
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const setPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, setPending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        window.localStorage.setItem("taskpro-token", action.payload.token);
      })
      .addCase(register.rejected, setRejected)

      .addCase(logIn.pending, setPending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        window.localStorage.setItem("taskpro-token", action.payload.token);
      })
      .addCase(logIn.rejected, setRejected)

      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        window.localStorage.removeItem("taskpro-token");
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        window.localStorage.removeItem("taskpro-token");
      })

      .addCase(updateProfile.pending, setPending)
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, setRejected)

      .addCase(updateTheme.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearAuthError } = slice.actions;
export default slice.reducer;
