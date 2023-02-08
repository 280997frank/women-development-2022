import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isOpen: boolean;
}

const initialState: IInitialState = {
  isOpen: false,
};

const shareHopeSlice = createSlice({
  name: "share-hope",
  initialState,
  reducers: {
    clear: () => initialState,
    setStream: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const actions = {
  ...shareHopeSlice.actions,
};

export const { reducer } = shareHopeSlice;
