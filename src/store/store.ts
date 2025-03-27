import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./features/authenticationSlices";
import userReducer from "./features/userSlices";
import bannerReducer from "./features/bannerSlices";
import promoReducer from "./features/promoSlices";
import categoryReducer from "./features/categorySlices";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    banner: bannerReducer,
    promo: promoReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
