import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user/response";
import {
  getAllUserThunk,
  getLoggedUserThunk,
  updateProfileThunk,
  updateUserRoleThunk,
} from "../thunks/userThunks";

interface UserState {
  loading: {
    loggedUser: boolean;
    allUser: boolean;
    updateProfile: boolean;
    updateUserRole: boolean;
  };
  message: {
    loggedUser: string | null;
    allUser: string | null;
    updateProfile: string | null;
    updateUserRole: string | null;
  };
  loggedUser: User | null;
  allUsers: User[];
}

const storedUser = sessionStorage.getItem("user");

const initialState: UserState = {
  loading: {
    loggedUser: false,
    allUser: false,
    updateProfile: false,
    updateUserRole: false,
  },
  message: {
    loggedUser: null,
    allUser: null,
    updateProfile: null,
    updateUserRole: null,
  },
  loggedUser: storedUser ? JSON.parse(storedUser) : null,
  allUsers: [],
};

const handleAsyncCases = <T extends UserState>(
  builder: ActionReducerMapBuilder<T>,
  thunk: any,
  key: keyof UserState["loading"]
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading[key] = true;
      state.message[key] = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading[key] = false;
      state.message[key] = action.payload.message as string;

      if (key === "loggedUser") {
        state.loggedUser = action.payload.data as User;

        sessionStorage.setItem(
          "user",
          JSON.stringify(action.payload.data as User)
        );
      }

      if (key === "allUser") {
        state.allUsers = action.payload.data as User[];
      }

      console.log(action.payload);
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading[key] = false;
      state.message[key] = (action.payload as string) ?? null;
    });
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncCases(builder, getLoggedUserThunk, "loggedUser");
    handleAsyncCases(builder, getAllUserThunk, "allUser");
    handleAsyncCases(builder, updateProfileThunk, "updateProfile");
    handleAsyncCases(builder, updateUserRoleThunk, "updateUserRole");
  },
});

export default userSlice.reducer;
