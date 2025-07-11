import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import detailsReducer from "../features/panicDetailsSlice";
import historyReducer from "../features/historySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    details: detailsReducer,
    history: historyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
