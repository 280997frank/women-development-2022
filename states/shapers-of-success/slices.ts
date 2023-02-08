import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isOpen: boolean;
  content: string;
  type: string;
}

const initialState: IInitialState = {
  isOpen: false,
  content: "",
  type: "",
};

const shapersOfSuccessSlice = createSlice({
  name: "shapers-of-success",
  initialState,
  reducers: {
    clear: () => initialState,
    setStream: (state, action: PayloadAction<IInitialState>) => {
      state.isOpen = action.payload.isOpen;
      state.content = action.payload.content;
      state.type = action.payload.type;
    },
  },
});

export const actions = {
  ...shapersOfSuccessSlice.actions,
};

export const { reducer } = shapersOfSuccessSlice;
