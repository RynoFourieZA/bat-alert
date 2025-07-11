import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PanicDetailsState {
  status?: string;
  message?: string;
  panic_id: string;
}

interface PayloadType {
  status?: string;
  message?: string;
  panic_id: string;
}

const initialState: PanicDetailsState = {
  panic_id: "",
  message: "",
  status: "",
};

const panicDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setPanicId: (state, action: PayloadAction<PayloadType>) => {
      sessionStorage.setItem("panic_id", action.payload?.panic_id);
      state.panic_id = action.payload?.panic_id;
    },
  },
});

export const { setPanicId } = panicDetailsSlice.actions;

export default panicDetailsSlice.reducer;
