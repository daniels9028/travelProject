import { createAsyncThunk } from "@reduxjs/toolkit";

import cartServices from "../../api/cartServices";
import {
  AddCartCredentials,
  DeleteCartCredentials,
  UpdateCartCredentials,
} from "../../types/cart/credential";
import {
  AddCartResponse,
  AllCartResponse,
  DeleteCartResponse,
  UpdateCartResponse,
} from "../../types/cart/response";
import { AxiosError } from "axios";

export const addCartThunk = createAsyncThunk<
  AddCartResponse,
  AddCartCredentials,
  { rejectValue: string }
>("cart/add-cart", async (credentials, { rejectWithValue }) => {
  try {
    return await cartServices.addCartService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when add cart"
    );
  }
});

export const updateCartThunk = createAsyncThunk<
  UpdateCartResponse,
  UpdateCartCredentials,
  { rejectValue: string }
>("cart/update-cart", async (credentials, { rejectWithValue }) => {
  try {
    return await cartServices.updateCartService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when update cart"
    );
  }
});

export const deleteCartThunk = createAsyncThunk<
  DeleteCartResponse,
  DeleteCartCredentials,
  { rejectValue: string }
>("cart/delete-cart", async (credentials, { rejectWithValue }) => {
  try {
    return await cartServices.deleteCartService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when delete cart"
    );
  }
});

export const allCartThunk = createAsyncThunk<
  AllCartResponse,
  void,
  { rejectValue: string }
>("cart/all-cart", async (_, { rejectWithValue }) => {
  try {
    return await cartServices.allCartService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get all cart"
    );
  }
});
