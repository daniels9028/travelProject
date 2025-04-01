import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { Banner } from "../../types/banner/response";
import {
  allBannerThunk,
  bannerByIdThunk,
  createBannerThunk,
  deleteBannerThunk,
  updateBannerThunk,
} from "../thunks/bannerThunks";

interface BannerState {
  loading: Record<string, boolean>;
  message: Record<string, string | null>;
  banner: Banner[];
  selectedBanner: Banner | null;
}

const initialState: BannerState = {
  loading: {
    createBanner: false,
    updateBanner: false,
    deleteBanner: false,
    allBanner: false,
    selectedBanner: false,
  },
  message: {
    createBanner: null,
    updateBanner: null,
    deleteBanner: null,
    allBanner: null,
    selectedBanner: null,
  },
  banner: [],
  selectedBanner: null,
};

const handleAsyncCases = <T extends BannerState>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof BannerState["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(thunk.fulfilled, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload.message as string;

      if (key === "allBanner") {
        state.banner = payload.data as Banner[];
      }

      if (key === "selectedBanner") {
        state.selectedBanner = payload.data as Banner;
      }
    })
    .addCase(thunk.rejected, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload as string;
    });
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    clearBannerMessage: (state, { payload }) => {
      state.message[payload.key] = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncCases(builder, createBannerThunk, "createBanner");
    handleAsyncCases(builder, updateBannerThunk, "updateBanner");
    handleAsyncCases(builder, deleteBannerThunk, "deleteBanner");
    handleAsyncCases(builder, allBannerThunk, "allBanner");
    handleAsyncCases(builder, bannerByIdThunk, "selectedBanner");
  },
});

export const { clearBannerMessage } = bannerSlice.actions;
export default bannerSlice.reducer;
