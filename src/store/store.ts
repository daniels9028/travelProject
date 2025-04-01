import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./features/authenticationSlices";
import userReducer from "./features/userSlices";
import bannerReducer from "./features/bannerSlices";
import promoReducer from "./features/promoSlices";
import categoryReducer from "./features/categorySlices";
import activityReducer from "./features/activitySlices";
import paymentReducer from "./features/paymentSlices";
import cartReducer from "./features/cartSlices";
import transactionReducer from "./features/transactionSlices";
import uploadReducer from "./features/uploadSlices";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    banner: bannerReducer,
    promo: promoReducer,
    category: categoryReducer,
    activity: activityReducer,
    payment: paymentReducer,
    cart: cartReducer,
    transaction: transactionReducer,
    upload: uploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
