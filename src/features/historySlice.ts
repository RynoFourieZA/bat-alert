import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PanicDetailsState {
  id: number | null;
  longitude: string;
  latitude: string;
  panic_type: string;
  details: string;
  created_at: string;
  status: {
    id: number | null;
    name: string;
  };
}

interface PayloadType {
  status?: string;
  message?: string;
  data: {
    panics: Array<PanicDetailsState>;
  };
  press?: boolean;
  getLastAlert?: PanicDetailsState;
}

interface HistoryState {
  status?: string;
  message?: string;
  data: {
    panics: Array<PanicDetailsState>;
  };
  press?: boolean;
  getLastAlert?: PanicDetailsState;
}

interface PayLoadPressType {
  press: boolean;
}

interface PayLoadLastAlertType {
  getLastAlert?: PanicDetailsState;
}

const initialState: HistoryState = {
  status: "",
  message: "",
  data: {
    panics: [],
  },
  press: false,
  getLastAlert: {
    id: null,
    longitude: "",
    latitude: "",
    panic_type: "",
    details: "",
    created_at: "",
    status: {
      id: null,
      name: "",
    },
  },
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<PayloadType>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data.panics = action.payload.data.panics;
    },
    setPress: (state, action: PayloadAction<PayLoadPressType>) => {
      state.press = action.payload.press;
    },
    setLastAlert: (state, action: PayloadAction<PayLoadLastAlertType>) => {
      state.getLastAlert = action.payload.getLastAlert;
    },
  },
});

export const { setHistory, setPress, setLastAlert } = historySlice.actions;

export default historySlice.reducer;
