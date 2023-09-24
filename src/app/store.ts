import { configureStore } from "@reduxjs/toolkit";
import { gameStateReducer } from "../features/gameState/game";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "features/api/apiSlice";
import { playerStateReducer } from "features/gameState/player";

const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    playerState: playerStateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
