import { createAsyncThunk } from "@reduxjs/toolkit";

import userServices from "../../api/userServices";
import {
  UpdateProfileCredentials,
  UpdateUserRoleCredentials,
} from "../../types/user/credential";
import {
  AllUserResponse,
  LoggedUserResponse,
  UpdateProfileResponse,
  UpdateUserRoleResponse,
} from "../../types/user/response";
import { AxiosError } from "axios";

export const getLoggedUserThunk = createAsyncThunk<
  LoggedUserResponse,
  void,
  { rejectValue: string }
>("user/get-logged-user", async (_, { rejectWithValue }) => {
  try {
    return await userServices.getLoggedUserService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when get logged user"
    );
  }
});

export const getAllUserThunk = createAsyncThunk<
  AllUserResponse,
  void,
  { rejectValue: string }
>("user/get-all-user", async (_, { rejectWithValue }) => {
  try {
    return await userServices.getAllUserService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when get all user"
    );
  }
});

export const updateProfileThunk = createAsyncThunk<
  UpdateProfileResponse,
  UpdateProfileCredentials,
  { rejectValue: string }
>(
  "user/update-profile",
  async (credentials: UpdateProfileCredentials, { rejectWithValue }) => {
    try {
      return await userServices.updateProfileService(credentials);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return rejectWithValue(
        axiosError.response?.data.message || "Error when update profile"
      );
    }
  }
);

export const updateUserRoleThunk = createAsyncThunk<
  UpdateUserRoleResponse,
  UpdateUserRoleCredentials,
  { rejectValue: string }
>(
  "user/update-user-role",
  async (credentials: UpdateUserRoleCredentials, { rejectWithValue }) => {
    try {
      return await userServices.updateUserRoleService(credentials);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return rejectWithValue(
        axiosError.response?.data.message || "Error when update role"
      );
    }
  }
);
