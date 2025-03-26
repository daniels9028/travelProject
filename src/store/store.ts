import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./features/authenticationSlices";
import userReducer from "./features/userSlices";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
