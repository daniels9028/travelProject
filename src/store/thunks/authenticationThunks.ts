import { createAsyncThunk } from "@reduxjs/toolkit";

import authenticationServices from "../../api/authenticationServices";
import { LoginCredentials, RegisterCredentials } from "../../types/authentication/credential";

export const registerUserThunk = createAsyncThunk("authentication/register-user", async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
        return await authenticationServices.registerUserService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when register user");
    }
})

export const loginUserThunk = createAsyncThunk("authentication/login-user", async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
        return await authenticationServices.loginUserService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when login user")
    }
})

export const logoutUserThunk = createAsyncThunk("authentication/logout-user", async (_, { rejectWithValue }) => {
    try {
        return await authenticationServices.logoutUserService()
    } catch (error) {
        return rejectWithValue(error || "Error when logout")
    }
})