import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  activeYears: number[];
}

const initialState: InitialState = {
  activeYears: [],
};

const totSlice = createSlice({
  name: "trailblazersOfTomorrow",
  initialState,
  reducers: {
    clear: () => initialState,
    setActiveYears: (state, action) => {
      state.activeYears = action.payload;
    },
  },
});

export const actions = {
  ...totSlice.actions,
};

export const { reducer } = totSlice;
