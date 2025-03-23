import { createAsyncThunk } from "@reduxjs/toolkit";

import categoryServices from "../../api/categoryServices";
import { CategoryByIdCredentials, CreateCategoryCredentials, DeleteCategoryCredentials, UpdateCategoryCredentials } from "../../types/category/credential";

export const createCategoryThunk = createAsyncThunk("category/create-category", async (credentials: CreateCategoryCredentials, { rejectWithValue }) => {
    try {
        return await categoryServices.createCategoryService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when create category")
    }
})

export const updateCategoryThunk = createAsyncThunk("category/update-category", async (credentials: UpdateCategoryCredentials, { rejectWithValue }) => {
    try {
        return await categoryServices.updateCategoryService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when update category")
    }
})

export const deleteCategoryThunk = createAsyncThunk("category/delete-category", async (credentials: DeleteCategoryCredentials, { rejectWithValue }) => {
    try {
        return await categoryServices.deleteCategoryService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when delete category")
    }
})

export const allCategoryThunk = createAsyncThunk("category/all-category", async (_, { rejectWithValue }) => {
    try {
        return await categoryServices.allCategoryService()
    } catch (error) {
        return rejectWithValue(error || "Error when get all category")
    }
})

export const categoryByIdThunk = createAsyncThunk("category/category-by-id", async (credentials: CategoryByIdCredentials, { rejectWithValue }) => {
    try {
        return await categoryServices.categoryByIdService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when get category by id")
    }
})