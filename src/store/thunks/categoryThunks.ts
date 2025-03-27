import { createAsyncThunk } from "@reduxjs/toolkit";

import categoryServices from "../../api/categoryServices";
import {
  CategoryByIdCredentials,
  CreateCategoryCredentials,
  DeleteCategoryCredentials,
  UpdateCategoryCredentials,
} from "../../types/category/credential";
import {
  AllCategoryResponse,
  CategoryByIdResponse,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  UpdateCategoryResponse,
} from "../../types/category/response";
import { AxiosError } from "axios";

export const createCategoryThunk = createAsyncThunk<
  CreateCategoryResponse,
  CreateCategoryCredentials,
  { rejectValue: string }
>("category/create-category", async (credentials, { rejectWithValue }) => {
  try {
    return await categoryServices.createCategoryService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when create category"
    );
  }
});

export const updateCategoryThunk = createAsyncThunk<
  UpdateCategoryResponse,
  UpdateCategoryCredentials,
  { rejectValue: string }
>("category/update-category", async (credentials, { rejectWithValue }) => {
  try {
    return await categoryServices.updateCategoryService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when update category"
    );
  }
});

export const deleteCategoryThunk = createAsyncThunk<
  DeleteCategoryResponse,
  DeleteCategoryCredentials,
  { rejectValue: string }
>("category/delete-category", async (credentials, { rejectWithValue }) => {
  try {
    return await categoryServices.deleteCategoryService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when delete category"
    );
  }
});

export const allCategoryThunk = createAsyncThunk<
  AllCategoryResponse,
  void,
  { rejectValue: string }
>("category/all-category", async (_, { rejectWithValue }) => {
  try {
    return await categoryServices.allCategoryService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get all category"
    );
  }
});

export const categoryByIdThunk = createAsyncThunk<
  CategoryByIdResponse,
  CategoryByIdCredentials,
  { rejectValue: string }
>("category/category-by-id", async (credentials, { rejectWithValue }) => {
  try {
    return await categoryServices.categoryByIdService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get category by id"
    );
  }
});
