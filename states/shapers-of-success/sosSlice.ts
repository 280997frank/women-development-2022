import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  activeYears: string[];
}

const initialState: InitialState = {
  activeYears: [],
};

const sosSlice = createSlice({
  name: "shapersOfSuccessProgress",
  initialState,
  reducers: {
    clear: () => initialState,
    setActiveYears: (state, action) => {
      state.activeYears = action.payload;
    },
  },
});

export const actions = {
  ...sosSlice.actions,
};

export const { reducer } = sosSlice;
