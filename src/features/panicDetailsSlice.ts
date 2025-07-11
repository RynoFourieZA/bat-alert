import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PanicDetailsState {
  status?: string;
  message?: string;
  panicId: number | null;
}

interface PayloadType {
  status?: string;
  message?: string;
  panic_id: number | null;
}

const initialState: PanicDetailsState = {
  panicId: null,
  message: "",
  status: "",
};

const panicDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setPanicId: (state, action: PayloadAction<PayloadType>) => {
      const storedPanicId = sessionStorage.getItem("panic_id");

      let getSessionPanicId: PayloadType;
      
        if (storedPanicId !== null) {
          getSessionPanicId = { panic_id: +storedPanicId };
        } else {
          getSessionPanicId = { panic_id: null }; 
        }

      state.panicId = action.payload?.panic_id || getSessionPanicId.panic_id;
    },
  },
});

export const { setPanicId } = panicDetailsSlice.actions;

export default panicDetailsSlice.reducer;
