import { createAsyncThunk } from "@reduxjs/toolkit";

import cartServices from "../../api/cartServices";
import { AddCartCredentials, DeleteCartCredentials, UpdateCartCredentials } from "../../types/cart/credential";

export const addCartThunk = createAsyncThunk("cart/add-cart", async (credentials: AddCartCredentials, { rejectWithValue }) => {
    try {
        return await cartServices.addCartService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when add cart")
    }
})

export const updateCartThunk = createAsyncThunk("cart/update-cart", async (credentials: UpdateCartCredentials, { rejectWithValue }) => {
    try {
        return await cartServices.updateCartService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update cart")
    }
})

export const deleteCartThunk = createAsyncThunk("cart/delete-cart", async (credentials: DeleteCartCredentials, { rejectWithValue }) => {
    try {
        return await cartServices.deleteCartService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when delete cart")
    }
})

export const allCartThunk = createAsyncThunk("cart/all-cart", async (_, { rejectWithValue }) => {
    try {
        return await cartServices.allCartService()
    } catch (error) {
        return rejectWithValue(error || "Error when get all cart")
    }
})