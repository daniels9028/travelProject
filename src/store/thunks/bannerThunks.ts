import { createAsyncThunk } from "@reduxjs/toolkit";

import bannerServices from "../../api/bannerServices";
import { BannerByIdCredentials, CreateBannerCredentials, DeleteBannerCredentials, UpdateBannerCredentials } from "../../types/banner/credential";

export const createBannerThunk = createAsyncThunk("banner/create-banner", async (credentials: CreateBannerCredentials, { rejectWithValue }) => {
    try {
        return await bannerServices.createBannerService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when create banner")
    }
})

export const updateBannerThunk = createAsyncThunk("banner/update-banner", async (credentials: UpdateBannerCredentials, { rejectWithValue }) => {
    try {
        return await bannerServices.updateBannerService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update banner")
    }
})

export const deleteBannerThunk = createAsyncThunk("banner/delete-banner", async (credentials: DeleteBannerCredentials, { rejectWithValue }) => {
    try {
        return await bannerServices.deleteBannerService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when delete banner")
    }
})

export const allBannerThunk = createAsyncThunk("banner/all-banner", async (_, { rejectWithValue }) => {
    try {
        return await bannerServices.allBannerService()
    } catch (error) {
        return rejectWithValue(error || "Error when get all banner")
    }
})

export const bannerByIdThunk = createAsyncThunk("banner/banner-by-id", async (credentials: BannerByIdCredentials, { rejectWithValue }) => {
    try {
        return await bannerServices.bannerByIdService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when get banner by id")
    }
})