import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./features/authenticationSlices";
import userReducer from "./features/userSlices";
import bannerReducer from "./features/bannerSlices";
import promoReducer from "./features/promoSlices";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    banner: bannerReducer,
    promo: promoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
