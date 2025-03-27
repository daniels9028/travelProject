import { createAsyncThunk } from "@reduxjs/toolkit";

import bannerServices from "../../api/bannerServices";
import {
  BannerByIdCredentials,
  CreateBannerCredentials,
  DeleteBannerCredentials,
  UpdateBannerCredentials,
} from "../../types/banner/credential";
import {
  AllBannerResponse,
  BannerByIdResponse,
  CreateBannerResponse,
  DeleteBannerResponse,
  UpdateBannerResponse,
} from "../../types/banner/response";
import { AxiosError } from "axios";

export const createBannerThunk = createAsyncThunk<
  CreateBannerResponse,
  CreateBannerCredentials,
  { rejectValue: string }
>("banner/create-banner", async (credentials, { rejectWithValue }) => {
  try {
    return await bannerServices.createBannerService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when create banner"
    );
  }
});

export const updateBannerThunk = createAsyncThunk<
  UpdateBannerResponse,
  UpdateBannerCredentials,
  { rejectValue: string }
>("banner/update-banner", async (credentials, { rejectWithValue }) => {
  try {
    return await bannerServices.updateBannerService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when update banner"
    );
  }
});

export const deleteBannerThunk = createAsyncThunk<
  DeleteBannerResponse,
  DeleteBannerCredentials,
  { rejectValue: string }
>("banner/delete-banner", async (credentials, { rejectWithValue }) => {
  try {
    return await bannerServices.deleteBannerService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when delete banner"
    );
  }
});

export const allBannerThunk = createAsyncThunk<
  AllBannerResponse,
  void,
  { rejectValue: string }
>("banner/all-banner", async (_, { rejectWithValue }) => {
  try {
    return await bannerServices.allBannerService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get all banner"
    );
  }
});

export const bannerByIdThunk = createAsyncThunk<
  BannerByIdResponse,
  BannerByIdCredentials,
  { rejectValue: string }
>("banner/banner-by-id", async (credentials, { rejectWithValue }) => {
  try {
    return await bannerServices.bannerByIdService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get banner by id"
    );
  }
});
