import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as hopeReducer } from "@/states/hope/slices";
import { reducer as shareHopeReducer } from "@/states/hope/share-hope/slices";
import { reducer as popReducer } from "@/states/pioneersOfProgress/slices";
import { reducer as totReducer } from "@/states/trailblazersOfTomorrow/slices";
import { reducer as sosReducer } from "@/states/shapers-of-success/slices";
import { reducer as sosSliceReducer } from "@/states/shapers-of-success/sosSlice";
import { reducer as authSliceReducer } from "@/states/auth/slices";
import { reducer as fullscreenVideoReducer } from "@/states/fullscreen/slice";
import { reducer as placeholderReducer } from "@/states/placeholder/slice";

// import { reducer as faqsReducer } from 'state/faqs/slice'

const rootReducer = combineReducers({
  hope: hopeReducer,
  shareHope: shareHopeReducer,
  pioneerOfProgress: popReducer,
  trailblazersOfTomorrow: totReducer,
  shapersOfSuccess: sosReducer,
  shapersOfSuccessProgress: sosSliceReducer,
  auth: authSliceReducer,
  fullscreenVideo: fullscreenVideoReducer,
  placeholder: placeholderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
