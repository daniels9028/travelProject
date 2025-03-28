import { createAsyncThunk } from "@reduxjs/toolkit";

import transactionServices from "../../api/transactionServices";
import {
  CancelTransactionCredentials,
  CreateTransactionCredentials,
  TransactionByIdCredentials,
  UpdateTransactionProofPaymentCredentials,
  UpdateTransactionStatusCredentials,
} from "../../types/transaction/credential";
import {
  AllTransactionResponse,
  CancelTransactionResponse,
  CreateTransactionResponse,
  MyTransactionResponse,
  TransactionByIdResponse,
  UpdateTransactionProofPaymentResponse,
  UpdateTransactionStatusResponse,
} from "../../types/transaction/response";
import { AxiosError } from "axios";

export const transactionByIdThunk = createAsyncThunk<
  TransactionByIdResponse,
  TransactionByIdCredentials,
  { rejectValue: string }
>("transaction/transaction-by-id", async (credentials, { rejectWithValue }) => {
  try {
    return await transactionServices.transactionByIdService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get transaction by id"
    );
  }
});

export const myTransactionThunk = createAsyncThunk<
  MyTransactionResponse,
  void,
  { rejectValue: string }
>("transaction/my-transaction", async (_, { rejectWithValue }) => {
  try {
    return await transactionServices.myTransactionService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get my transaction"
    );
  }
});

export const allTransactionThunk = createAsyncThunk<
  AllTransactionResponse,
  void,
  { rejectValue: string }
>("transaction/all-transaction", async (_, { rejectWithValue }) => {
  try {
    return await transactionServices.allTransactionService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get all transaction"
    );
  }
});

export const createTransactionThunk = createAsyncThunk<
  CreateTransactionResponse,
  CreateTransactionCredentials,
  { rejectValue: string }
>(
  "transaction/create-transaction",
  async (credentials, { rejectWithValue }) => {
    try {
      return await transactionServices.createTransactionService(credentials);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        axiosError.response?.data.message || "Error when create transaction"
      );
    }
  }
);

export const cancelTransactionThunk = createAsyncThunk<
  CancelTransactionResponse,
  CancelTransactionCredentials,
  { rejectValue: string }
>(
  "transaction/cancel-transaction",
  async (credentials, { rejectWithValue }) => {
    try {
      return await transactionServices.cancelTransactionService(credentials);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        axiosError.response?.data.message || "Error when cancel transaction"
      );
    }
  }
);

export const updateTransactionProofPaymentThunk = createAsyncThunk<
  UpdateTransactionProofPaymentResponse,
  UpdateTransactionProofPaymentCredentials,
  { rejectValue: string }
>(
  "transaction/update-transaction-proof-payment",
  async (credentials, { rejectWithValue }) => {
    try {
      return await transactionServices.updateTransactionProofPaymentService(
        credentials
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        axiosError.response?.data.message ||
          "Error when update transaction proof payment"
      );
    }
  }
);

export const updateTransactionStatusThunk = createAsyncThunk<
  UpdateTransactionStatusResponse,
  UpdateTransactionStatusCredentials,
  { rejectValue: string }
>(
  "transaction/update-transaction-status",
  async (credentials, { rejectWithValue }) => {
    try {
      return await transactionServices.updateTransactionStatusService(
        credentials
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        axiosError.response?.data.message ||
          "Error when update transaction status"
      );
    }
  }
);
