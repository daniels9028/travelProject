import { createAsyncThunk } from "@reduxjs/toolkit";

import userServices from "../../api/userServices";
import { UpdateProfileCredentials, UpdateUserRoleCredentials } from "../../types/user/credential";

export const getLoggedUserThunk = createAsyncThunk("user/get-logged-user", async (_, { rejectWithValue }) => {
    try {
        return await userServices.getLoggedUserService()
    } catch (error) {
        return rejectWithValue(error || "Error when get logged user")
    }
})

export const getAllUserThunk = createAsyncThunk("user/get-all-user", async (_, { rejectWithValue }) => {
    try {
        return await userServices.getAllUserService()
    } catch (error) {
        return rejectWithValue(error || "Error when get all user")
    }
})

export const updateProfileThunk = createAsyncThunk("user/update-profile", async (credentials: UpdateProfileCredentials, { rejectWithValue }) => {
    try {
        return await userServices.updateProfileService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update profile")
    }
})

export const updateUserRoleThunk = createAsyncThunk("user/update-user-role", async (credentials: UpdateUserRoleCredentials, { rejectWithValue }) => {
    try {
        return await userServices.updateUserRoleService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update user role")
    }
})