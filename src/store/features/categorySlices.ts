import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { Category } from "../../types/category/response";
import {
  allCategoryThunk,
  categoryByIdThunk,
  createCategoryThunk,
  deleteCategoryThunk,
  updateCategoryThunk,
} from "../thunks/categoryThunks";

interface CategoryState {
  loading: Record<string, boolean>;
  message: Record<string, string | null>;
  category: Category[];
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  loading: {
    createCategory: false,
    updateCategory: false,
    deleteCategory: false,
    allCategory: false,
    categoryById: false,
  },
  message: {
    createCategory: null,
    updateCategory: null,
    deleteCategory: null,
    allCategory: null,
    categoryById: null,
  },
  category: [],
  selectedCategory: null,
};

const handleAsyncCases = <T extends CategoryState>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof CategoryState["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(thunk.fulfilled, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload.message as string;

      if (key === "allCategory") {
        state.category = payload.data as Category[];
      }

      if (key === "categoryById") {
        state.selectedCategory = payload.data as Category;
      }
    })
    .addCase(thunk.rejected, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload ?? null;
    });
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearMessage: (state, { payload }) => {
      state.message[payload.key] = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncCases(builder, createCategoryThunk, "createCategory");
    handleAsyncCases(builder, updateCategoryThunk, "updateCategory");
    handleAsyncCases(builder, deleteCategoryThunk, "deleteCategory");
    handleAsyncCases(builder, allCategoryThunk, "allCategory");
    handleAsyncCases(builder, categoryByIdThunk, "categoryById");
  },
});

export const { clearMessage } = categorySlice.actions;
export default categorySlice.reducer;
