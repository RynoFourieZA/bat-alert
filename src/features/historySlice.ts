import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PanicDetailsState {
  id: number | null;
  longitude: string;
  latitude: string;
  panic_type: string;
  details: string;
  created_at: string;
  status: {
    id: number;
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
}

interface HistoryState {
  status?: string;
  message?: string;
  data: {
    panics: Array<PanicDetailsState>;
  };
  press?: boolean;
}

interface PayLoadPressType {
  press: boolean;
}

const initialState: HistoryState = {
  status: "",
  message: "",
  data: {
    panics: [],
  },
  press: false,
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
  },
});

export const { setHistory, setPress } = historySlice.actions;

export default historySlice.reducer;
