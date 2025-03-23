import { createAsyncThunk } from "@reduxjs/toolkit";

import promoServices from "../../api/promoServices";
import { CreatePromoCredentials, DeletePromoCredentials, PromoByIdCredentials, UpdatePromoCredentials } from "../../types/promo/credential";

export const createPromoThunk = createAsyncThunk("promo/create-promo", async (credentials: CreatePromoCredentials, { rejectWithValue }) => {
    try {
        return await promoServices.createPromoService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when create promo")
    }
})

export const updatePromoThunk = createAsyncThunk("promo/update-promo", async (credentials: UpdatePromoCredentials, { rejectWithValue }) => {
    try {
        return await promoServices.updatePromoService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update promo")
    }
})

export const deletePromoThunk = createAsyncThunk("promo/delete-promo", async (credentials: DeletePromoCredentials, { rejectWithValue }) => {
    try {
        return await promoServices.deletePromoService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when delete promo")
    }
})

export const allPromoThunk = createAsyncThunk("promo/get-all-promo", async (_, { rejectWithValue }) => {
    try {
        return await promoServices.allPromoService()
    } catch (error) {
        return rejectWithValue(error || "Error when get all promo")
    }
})

export const promoByIdThunk = createAsyncThunk("promo/get-promo-by-id", async (credentials: PromoByIdCredentials, { rejectWithValue }) => {
    try {
        return await promoServices.promoByIdService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when get promo by id")
    }
})