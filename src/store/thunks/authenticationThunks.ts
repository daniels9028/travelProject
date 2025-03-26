import { createAsyncThunk } from "@reduxjs/toolkit";

import authenticationServices from "../../api/authenticationServices";
import {
  LoginCredentials,
  RegisterCredentials,
} from "../../types/authentication/credential";
import {
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
} from "../../types/authentication/response";
import { AxiosError } from "axios";

export const registerUserThunk = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: string }
>("authentication/register-user", async (credentials, { rejectWithValue }) => {
  try {
    return await authenticationServices.registerUserService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when registering user"
    );
  }
});

export const loginUserThunk = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("authentication/login-user", async (credentials, { rejectWithValue }) => {
  try {
    return await authenticationServices.loginUserService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when login"
    );
  }
});

export const logoutUserThunk = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: string }
>("authentication/logout-user", async (_, { rejectWithValue }) => {
  try {
    return await authenticationServices.logoutUserService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when logout"
    );
  }
});
