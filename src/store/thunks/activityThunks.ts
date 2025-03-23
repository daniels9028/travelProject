import { createAsyncThunk } from "@reduxjs/toolkit";

import activityServices from "../../api/activityServices";
import { ActivityByCategoryIdCredentials, ActivityByIdCredentials, CreateActivityCredentials, DeleteActivityCredentials, UpdateActivityCredentials } from "../../types/activity/credential";

export const createActivityThunk = createAsyncThunk("activity/create-activity", async (credentials: CreateActivityCredentials, { rejectWithValue }) => {
    try {
        return await activityServices.createActivityService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when create activity")
    }
})

export const allActivityThunk = createAsyncThunk("activity/all-activity", async (_, { rejectWithValue }) => {
    try {
        return await activityServices.allActivityService()
    } catch (error) {
        return rejectWithValue(error || "Error when get all activity")
    }
})

export const activityByIdThunk = createAsyncThunk("activity/get-activity-by-id", async (credentials: ActivityByIdCredentials, { rejectWithValue }) => {
    try {
        return await activityServices.activityByIdService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when get activity by id")
    }
})

export const activityByCategoryIdThunk = createAsyncThunk("activity/get-activity-by-category-id", async (credentials: ActivityByCategoryIdCredentials, { rejectWithValue }) => {
    try {
        return await activityServices.activityByCategoryIdService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when get activity by category id")
    }
})

export const updateActivityThunk = createAsyncThunk("activity/update-activity", async (credentials: UpdateActivityCredentials, { rejectWithValue }) => {
    try {
        return await activityServices.updateActivityService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update activity")
    }
})

export const deleteActivityThunk = createAsyncThunk("activity/delete-activity", async (credentials: DeleteActivityCredentials, { rejectWithValue }) => {
    try {
        return await activityServices.deleteActivityService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when delete activity")
    }
})