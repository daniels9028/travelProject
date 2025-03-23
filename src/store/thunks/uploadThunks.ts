import { createAsyncThunk } from "@reduxjs/toolkit";

import uploadServices from "../../api/uploadServices";
import { UploadImageCredentials } from "../../types/upload/credential";

export const uploadImageThunk = createAsyncThunk("upload/upload-image", async (credentials: UploadImageCredentials, { rejectWithValue }) => {
    try {
        return await uploadServices.uploadImageService(credentials)
    } catch (error) {
        return rejectWithValue(error || "Error when upload image")
    }
})