import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { Promo } from "../../types/promo/response";
import {
  allPromoThunk,
  createPromoThunk,
  deletePromoThunk,
  promoByIdThunk,
  updatePromoThunk,
} from "../thunks/promoThunks";

interface PromoState {
  loading: Record<string, boolean>;
  message: Record<string, string | null>;
  promo: Promo[];
  selectedPromo: Promo | null;
}

const initialState: PromoState = {
  loading: {
    createPromo: false,
    updatePromo: false,
    deletePromo: false,
    allPromo: false,
    promoById: false,
  },
  message: {
    createPromo: null,
    updatePromo: null,
    deletePromo: null,
    allPromo: null,
    promoById: null,
  },
  promo: [],
  selectedPromo: null,
};

const handleAsyncCases = <T extends PromoState>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof PromoState["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(thunk.fulfilled, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload.message as string;

      if (key === "allPromo") {
        state.promo = payload.data as Promo[];
      }

      if (key === "promoById") {
        state.selectedPromo = payload.data as Promo;
      }
    })
    .addCase(thunk.rejected, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload as string;
    });
};

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncCases(builder, createPromoThunk, "createPromo");
    handleAsyncCases(builder, updatePromoThunk, "updatePromo");
    handleAsyncCases(builder, deletePromoThunk, "deletePromo");
    handleAsyncCases(builder, allPromoThunk, "allPromo");
    handleAsyncCases(builder, promoByIdThunk, "promoById");
  },
});

export default promoSlice.reducer;
