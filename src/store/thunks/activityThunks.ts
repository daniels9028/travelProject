import { createAsyncThunk } from "@reduxjs/toolkit";

import activityServices from "../../api/activityServices";
import {
  ActivityByCategoryIdCredentials,
  ActivityByIdCredentials,
  CreateActivityCredentials,
  DeleteActivityCredentials,
  UpdateActivityCredentials,
} from "../../types/activity/credential";
import {
  ActivityByCategoryIdResponse,
  ActivityByIdResponse,
  AllActivityResponse,
  CreateActivityResponse,
  DeleteActivityResponse,
  UpdateActivityResponse,
} from "../../types/activity/response";
import { AxiosError } from "axios";

export const createActivityThunk = createAsyncThunk<
  CreateActivityResponse,
  CreateActivityCredentials,
  { rejectValue: string }
>("activity/create-activity", async (credentials, { rejectWithValue }) => {
  try {
    return await activityServices.createActivityService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when create activity"
    );
  }
});

export const allActivityThunk = createAsyncThunk<
  AllActivityResponse,
  void,
  { rejectValue: string }
>("activity/all-activity", async (_, { rejectWithValue }) => {
  try {
    return await activityServices.allActivityService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get all activity"
    );
  }
});

export const activityByIdThunk = createAsyncThunk<
  ActivityByIdResponse,
  ActivityByIdCredentials,
  { rejectValue: string }
>("activity/get-activity-by-id", async (credentials, { rejectWithValue }) => {
  try {
    return await activityServices.activityByIdService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get activity by id"
    );
  }
});

export const activityByCategoryIdThunk = createAsyncThunk<
  ActivityByCategoryIdResponse,
  ActivityByCategoryIdCredentials,
  { rejectValue: string }
>(
  "activity/get-activity-by-category-id",
  async (credentials, { rejectWithValue }) => {
    try {
      return await activityServices.activityByCategoryIdService(credentials);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        axiosError.response?.data.message ||
          "Error when get activity by category id"
      );
    }
  }
);

export const updateActivityThunk = createAsyncThunk<
  UpdateActivityResponse,
  UpdateActivityCredentials,
  { rejectValue: string }
>("activity/update-activity", async (credentials, { rejectWithValue }) => {
  try {
    return await activityServices.updateActivityService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when update activity"
    );
  }
});

export const deleteActivityThunk = createAsyncThunk<
  DeleteActivityResponse,
  DeleteActivityCredentials,
  { rejectValue: string }
>("activity/delete-activity", async (credentials, { rejectWithValue }) => {
  try {
    return await activityServices.deleteActivityService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when delete activity"
    );
  }
});
