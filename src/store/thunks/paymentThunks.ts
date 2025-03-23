import { createAsyncThunk } from "@reduxjs/toolkit";

import paymentServices from "../../api/paymentServices";

export const paymentMethodThunk = createAsyncThunk("payment-method/get-all-payment-method", async (_, { rejectWithValue }) => {
    try {
        return await paymentServices.paymentMethodService()
    } catch (error) {
        return rejectWithValue(error || "Error when get all payment method")
    }
})

export const generatePaymentMethodThunk = createAsyncThunk("payment-method/generate-payment-method", async (_, { rejectWithValue }) => {
    try {
        return await paymentServices.generatePaymentMethodService()
    } catch (error) {
        return rejectWithValue(error || "Error when generate payment method")
    }
})