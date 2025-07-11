import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import detailsReducer from "../features/panicDetailsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    details: detailsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
