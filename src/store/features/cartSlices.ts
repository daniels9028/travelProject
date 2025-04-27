import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { Cart } from "../../types/cart/response";
import {
  addCartThunk,
  allCartThunk,
  deleteCartThunk,
  updateCartThunk,
} from "../thunks/cartThunks";

interface CartCase {
  loading: Record<string, boolean>;
  message: Record<string, string | null>;
  cart: Cart[];
}

const initialState: CartCase = {
  loading: {
    addCart: false,
    updateCart: false,
    deleteCart: false,
    allCart: false,
  },
  message: {
    addCart: null,
    updateCart: null,
    deleteCart: null,
    allCart: null,
  },
  cart: [],
};

const handleAsyncCases = <T extends CartCase>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof CartCase["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(thunk.fulfilled, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = (payload.message as string) ?? null;

      if (key === "allCart") state.cart = payload.data as Cart[];
    })
    .addCase(thunk.rejected, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload ?? null;
    });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartMessage: (state, { payload }) => {
      state.message[payload.key] = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncCases(builder, addCartThunk, "addCart");
    handleAsyncCases(builder, updateCartThunk, "updateCart");
    handleAsyncCases(builder, deleteCartThunk, "deleteCart");
    handleAsyncCases(builder, allCartThunk, "allCart");
  },
});

export const { clearCartMessage } = cartSlice.actions;
export default cartSlice.reducer;
