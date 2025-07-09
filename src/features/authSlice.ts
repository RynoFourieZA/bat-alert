import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    unsetCredentials: (state) => {
      state.token = "";
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
