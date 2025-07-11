import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  status: string;
  message: string;
}

interface PayloadType {
  status: string;
  message: string;
  data: {
    api_access_token: string;
  };
}

export interface StatusType {
  status: string;
}

export interface TokenType {
  token: string;
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
    setCredentials: (state, action: PayloadAction<PayloadType>) => {
      sessionStorage.setItem("token", action.payload?.data?.api_access_token);
      sessionStorage.setItem("message", action.payload?.message);
      sessionStorage.setItem("status", action.payload?.status);

      state.token = action.payload?.data?.api_access_token;
      state.message = action.payload?.message;
      state.status = action.payload?.status;
    },
    unsetCredentials: (state) => {
      state.token = "";
      state.status = "";
      state.message = "";
    },
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload.status;
    },
    setToken: (state, action: PayloadAction<TokenType>) => {
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials, unsetCredentials, setStatus, setToken } = authSlice.actions;

export default authSlice.reducer;
