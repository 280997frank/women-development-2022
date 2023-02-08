import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  activeYears: number[];
}

const initialState: InitialState = {
  activeYears: [],
};

const popSlice = createSlice({
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
  ...popSlice.actions,
};

export const { reducer } = popSlice;
