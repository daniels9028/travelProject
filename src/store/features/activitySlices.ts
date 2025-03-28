import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { Activity } from "../../types/activity/response";
import {
  activityByCategoryIdThunk,
  activityByIdThunk,
  allActivityThunk,
  createActivityThunk,
  deleteActivityThunk,
  updateActivityThunk,
} from "../thunks/activityThunks";

interface ActivityState {
  loading: Record<string, boolean>;
  message: Record<string, string | null>;
  activity: Activity[];
  activityByCategory: Activity[];
  selectedActivity: Activity | null;
  selectedCategory: string | null;
}

const initialState: ActivityState = {
  loading: {
    createActivity: false,
    allActivity: false,
    activityById: false,
    activityByCategoryId: false,
    updateActivity: false,
    deleteActivity: false,
  },
  message: {
    createActivity: null,
    allActivity: null,
    activityById: null,
    activityByCategoryId: null,
    updateActivity: null,
    deleteActivity: null,
  },
  activity: [],
  activityByCategory: [],
  selectedActivity: null,
  selectedCategory: null,
};

const handleAsyncCases = <T extends ActivityState>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof ActivityState["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(thunk.fulfilled, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload.message ?? null;

      if (key === "allActivity") state.activity = payload.data as Activity[];

      if (key === "activityById")
        state.selectedActivity = payload.data as Activity;

      if (key === "activityByCategoryId")
        state.activityByCategory = payload.data as Activity[];
    })
    .addCase(thunk.rejected, (state, { payload }) => {
      state.loading[key] = false;
      state.message[key] = payload ?? null;
    });
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncCases(builder, createActivityThunk, "createActivity");
    handleAsyncCases(builder, allActivityThunk, "allActivity");
    handleAsyncCases(builder, activityByIdThunk, "activityById");
    handleAsyncCases(
      builder,
      activityByCategoryIdThunk,
      "activityByCategoryId"
    );
    handleAsyncCases(builder, updateActivityThunk, "updateActivity");
    handleAsyncCases(builder, deleteActivityThunk, "deleteActivity");
  },
});

export default activitySlice.reducer;
