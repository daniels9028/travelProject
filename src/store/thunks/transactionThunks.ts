import { createAsyncThunk } from "@reduxjs/toolkit";

import transactionServices from "../../api/transactionServices";
import { CancelTransactionCredentials, CreateTransactionCredentials, TransactionByIdCredentials, UpdateTransactionProofPaymentCredentials, UpdateTransactionStatusCredentials } from "../../types/transaction/credential";

export const transactionByIdThunk = createAsyncThunk("transaction/transaction-by-id", async (credentials: TransactionByIdCredentials, { rejectWithValue }) => {
    try {
        return await transactionServices.transactionByIdService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when get transaction by id")
    }
})

export const myTransactionThunk = createAsyncThunk("transaction/my-transaction", async (_, { rejectWithValue }) => {
    try {
        return await transactionServices.myTransactionService()
    } catch (error) {
        return rejectWithValue(error || "Error when get my transaction")
    }
})

export const allTransactionThunk = createAsyncThunk("transaction/all-transaction", async (_, { rejectWithValue }) => {
    try {
        return await transactionServices.allTransactionService()
    } catch (error) {
        return rejectWithValue(error || "Error when get all transaction")
    }
})

export const createTransactionThunk = createAsyncThunk("transaction/create-transaction", async (credentials: CreateTransactionCredentials, { rejectWithValue }) => {
    try {
        return await transactionServices.createTransactionService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when create transaction")
    }
})

export const cancelTransactionThunk = createAsyncThunk("transaction/cancel-transaction", async (credentials: CancelTransactionCredentials, { rejectWithValue }) => {
    try {
        return await transactionServices.cancelTransactionService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when cancel transaction")
    }
})

export const updateTransactionProofPaymentThunk = createAsyncThunk("transaction/update-transaction-proof-payment", async (credentials: UpdateTransactionProofPaymentCredentials, { rejectWithValue }) => {
    try {
        return await transactionServices.updateTransactionProofPaymentService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update transaction proof payment")
    }
})

export const updateTransactionStatusThunk = createAsyncThunk("transaction/update-transaction-status", async (credentials: UpdateTransactionStatusCredentials, { rejectWithValue }) => {
    try {
        return await transactionServices.updateTransactionStatusService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update transaction status")
    }
})