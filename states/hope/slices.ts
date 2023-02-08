import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isOpen: boolean;
  title: string;
  content: string;
  image: string;
}

const initialState: IInitialState = {
  isOpen: false,
  title: "",
  content: "",
  image: "",
};

const hopeSlice = createSlice({
  name: "hope",
  initialState,
  reducers: {
    clear: () => initialState,
    setStream: (state, action: PayloadAction<IInitialState>) => {
      state.isOpen = action.payload.isOpen;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.image = action.payload.image;
    },
  },
});

export const actions = {
  ...hopeSlice.actions,
};

export const { reducer } = hopeSlice;
