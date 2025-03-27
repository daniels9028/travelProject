import { createAsyncThunk } from "@reduxjs/toolkit";

import promoServices from "../../api/promoServices";
import {
  CreatePromoCredentials,
  DeletePromoCredentials,
  PromoByIdCredentials,
  UpdatePromoCredentials,
} from "../../types/promo/credential";
import {
  AllPromoResponse,
  CreatePromoResponse,
  DeletePromoResponse,
  PromoByIdResponse,
  UpdatePromoResponse,
} from "../../types/promo/response";
import { AxiosError } from "axios";

export const createPromoThunk = createAsyncThunk<
  CreatePromoResponse,
  CreatePromoCredentials,
  { rejectValue: string }
>("promo/create-promo", async (credentials, { rejectWithValue }) => {
  try {
    return await promoServices.createPromoService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when create promo"
    );
  }
});

export const updatePromoThunk = createAsyncThunk<
  UpdatePromoResponse,
  UpdatePromoCredentials,
  { rejectValue: string }
>("promo/update-promo", async (credentials, { rejectWithValue }) => {
  try {
    return await promoServices.updatePromoService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when update promo"
    );
  }
});

export const deletePromoThunk = createAsyncThunk<
  DeletePromoResponse,
  DeletePromoCredentials,
  { rejectValue: string }
>("promo/delete-promo", async (credentials, { rejectWithValue }) => {
  try {
    return await promoServices.deletePromoService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return rejectWithValue(
      axiosError.response?.data.message || "Error when delete promo"
    );
  }
});

export const allPromoThunk = createAsyncThunk<
  AllPromoResponse,
  void,
  { rejectValue: string }
>("promo/get-all-promo", async (_, { rejectWithValue }) => {
  try {
    return await promoServices.allPromoService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get all promo"
    );
  }
});

export const promoByIdThunk = createAsyncThunk<
  PromoByIdResponse,
  PromoByIdCredentials,
  { rejectValue: string }
>("promo/get-promo-by-id", async (credentials, { rejectWithValue }) => {
  try {
    return await promoServices.promoByIdService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get promo by id"
    );
  }
});
