import { createAsyncThunk } from "@reduxjs/toolkit";

import uploadServices from "../../api/uploadServices";
import { UploadImageCredentials } from "../../types/upload/credential";
import { UploadImageResponse } from "../../types/upload/response";
import { AxiosError } from "axios";

export const uploadImageThunk = createAsyncThunk<
  UploadImageResponse,
  UploadImageCredentials,
  { rejectValue: string }
>("upload/upload-image", async (credentials, { rejectWithValue }) => {
  try {
    return await uploadServices.uploadImageService(credentials);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data.message || "Error when upload image"
    );
  }
});
