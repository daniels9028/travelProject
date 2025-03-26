import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
} from "../thunks/authenticationThunks";

interface AuthenticationState {
  message: {
    register: string | null;
    login: string | null;
    logout: string | null;
  };
  loading: {
    register: boolean;
    login: boolean;
    logout: boolean;
  };
  token: string | null;
}

const initialState: AuthenticationState = {
  message: {
    register: null,
    login: null,
    logout: null,
  },
  loading: {
    register: false,
    login: false,
    logout: false,
  },
  token: sessionStorage.getItem("token") || null,
};

const handleAsyncCases = <T extends AuthenticationState>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof AuthenticationState["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(
      thunk.fulfilled,
      (state, action: { payload: { message: string; token?: string } }) => {
        state.loading[key] = false;
        state.message[key] = action.payload.message;

        if (key === "login") {
          state.token = action.payload.token || null;
          sessionStorage.setItem("token", action.payload.token || "");
        }

        if (key === "logout") {
          state.token = null;
          sessionStorage.removeItem("token");
        }
      }
    )
    .addCase(thunk.rejected, (state, action: { payload?: string }) => {
      state.loading[key] = false;
      state.message[key] = action.payload ?? "An error occured";
    });
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    handleAsyncCases(builder, registerUserThunk, "register");
    handleAsyncCases(builder, loginUserThunk, "login");
    handleAsyncCases(builder, logoutUserThunk, "logout");
  },
});

export const { resetUserState } = authenticationSlice.actions;
export default authenticationSlice.reducer;
