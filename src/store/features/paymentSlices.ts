import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { Payment } from "../../types/payment/response";
import {
  generatePaymentMethodThunk,
  paymentMethodThunk,
} from "../thunks/paymentThunks";

interface PaymentState {
  loading: Record<string, boolean>;
  message: Record<string, string | null>;
  payment: Payment[];
}

const initialState: PaymentState = {
  loading: {
    paymentMethod: false,
    generatePayment: false,
  },
  message: {
    paymentMethod: null,
    generatePayment: null,
  },
  payment: [],
};

const handleAsyncCases = <T extends PaymentState>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof PaymentState["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(thunk.fulfilled, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload.message ?? null;

      if (key === "paymentMethod") state.payment = payload.data as Payment[];
    })
    .addCase(thunk.rejected, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = (payload as string) ?? null;
    });
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncCases(builder, paymentMethodThunk, "paymentMethod");
    handleAsyncCases(builder, generatePaymentMethodThunk, "generatePayment");
  },
});

export default paymentSlice.reducer;
