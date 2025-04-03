import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { Transaction } from "../../types/transaction/response";
import {
  allTransactionThunk,
  cancelTransactionThunk,
  createTransactionThunk,
  myTransactionThunk,
  transactionByIdThunk,
  updateTransactionProofPaymentThunk,
  updateTransactionStatusThunk,
} from "../thunks/transactionThunks";

interface TransactionState {
  loading: Record<string, boolean>;
  message: Record<string, string | null>;
  myTransaction: Transaction[];
  allTransaction: Transaction[];
  selectedTransaction: Transaction | null;
}

const initialState: TransactionState = {
  loading: {
    transactionById: false,
    myTransaction: false,
    allTransaction: false,
    createTransaction: false,
    cancelTransaction: false,
    updateTransactionProofPayment: false,
    updateTransactionStatus: false,
  },
  message: {
    transactionById: null,
    myTransaction: null,
    allTransaction: null,
    createTransaction: null,
    cancelTransaction: null,
    updateTransactionProofPayment: null,
    updateTransactionStatus: null,
  },
  myTransaction: [],
  allTransaction: [],
  selectedTransaction: null,
};

const handleAsyncCases = <T extends TransactionState>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof TransactionState["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(thunk.fulfilled, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = (payload.message as string) ?? null;

      if (key === "transactionById")
        state.selectedTransaction = (payload.data as Transaction) ?? null;

      if (key === "myTransaction")
        state.myTransaction = (payload.data as Transaction[]) ?? [];

      if (key === "allTransaction")
        state.allTransaction = (payload.data as Transaction[]) ?? [];
    })
    .addCase(thunk.rejected, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = (payload as string) ?? null;
    });
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearTransactionMessage: (state, { payload }) => {
      state.message[payload.key] = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncCases(builder, transactionByIdThunk, "transactionById");
    handleAsyncCases(builder, myTransactionThunk, "myTransaction");
    handleAsyncCases(builder, allTransactionThunk, "allTransaction");
    handleAsyncCases(builder, createTransactionThunk, "createTransaction");
    handleAsyncCases(builder, cancelTransactionThunk, "cancelTransaction");
    handleAsyncCases(
      builder,
      updateTransactionProofPaymentThunk,
      "updateTranscationProofPayment"
    );
    handleAsyncCases(
      builder,
      updateTransactionStatusThunk,
      "updateTransactionStatus"
    );
  },
});

export const { clearTransactionMessage } = transactionSlice.actions;
export default transactionSlice.reducer;
