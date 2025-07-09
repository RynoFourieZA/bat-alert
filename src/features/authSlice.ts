import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  status: string;
  message: string;
}

const initialState: AuthState = {
  token: "",
  status: "",
  message: "",
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

export const { setCredentials, unsetCredentials } = authSlice.actions;

export default authSlice.reducer;
