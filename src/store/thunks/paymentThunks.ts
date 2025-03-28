import { createAsyncThunk } from "@reduxjs/toolkit";

import paymentServices from "../../api/paymentServices";
import {
  GeneratePaymentMethodResponse,
  PaymentMethodResponse,
} from "../../types/payment/response";
import { AxiosError } from "axios";

export const paymentMethodThunk = createAsyncThunk<
  PaymentMethodResponse,
  void,
  { rejectValue: string }
>("payment-method/get-all-payment-method", async (_, { rejectWithValue }) => {
  try {
    return await paymentServices.paymentMethodService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when get all payment method"
    );
  }
});

export const generatePaymentMethodThunk = createAsyncThunk<
  GeneratePaymentMethodResponse,
  void,
  { rejectValue: string }
>("payment-method/generate-payment-method", async (_, { rejectWithValue }) => {
  try {
    return await paymentServices.generatePaymentMethodService();
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when generate payment method"
    );
  }
});
