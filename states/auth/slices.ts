import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  anonymousId: string;
  sessionId: string;
  loading: boolean;
  error: unknown;
  success: boolean;
}

const initialState: IInitialState = {
  anonymousId: "",
  sessionId: "",
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clear: () => initialState,
    setAnonymousId: (state, action: PayloadAction<string>) => {
      state.anonymousId = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
  },
});

export const actions = {
  ...authSlice.actions,
};

export const { reducer } = authSlice;
