import { createSlice } from "@reduxjs/toolkit";
import { uploadImageThunk } from "../thunks/uploadThunks";

interface UploadState {
  loading: boolean;
  message: string | null;
  url: string | null;
}

const initialState: UploadState = {
  loading: false,
  message: null,
  url: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUploadUrl: (state) => {
      state.url = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImageThunk.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(uploadImageThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = (payload.message as string) ?? null;
        state.url = (payload.url as string) ?? null;
      })
      .addCase(uploadImageThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.message = (payload as string) ?? null;
      });
  },
});

export const { resetUploadUrl } = uploadSlice.actions;
export default uploadSlice.reducer;
