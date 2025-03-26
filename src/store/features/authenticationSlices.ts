import { createSlice } from "@reduxjs/toolkit";

import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
} from "../thunks/authenticationThunks";

interface AuthenticationState {
  message: string | null;
  loading: boolean;
  token: string | null;
}

const initialState: AuthenticationState = {
  message: null,
  loading: false,
  token: sessionStorage.getItem("token") || null,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.message = payload ?? null;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.message = payload.message;
        sessionStorage.setItem("token", payload.token);
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.message = payload ?? null;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(logoutUserThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.message = payload ?? null;
      });
  },
});

export const { resetUserState } = authenticationSlice.actions;
export default authenticationSlice.reducer;
