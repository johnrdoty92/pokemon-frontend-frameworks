import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "features/api/apiSlice";
import { gameStateReducer, takeTurn } from "features/gameState/gameState";
import { Move } from "features/api/responseTypes";

const opponentMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    const { opponent, mode } = getState().gameState;
    if (
      action.type === "gameState/takeTurn" &&
      mode === "battle" &&
      action.payload.target === "opponent"
    ) {
      const { url } = opponent.moves[Math.floor(opponent.moves.length * Math.random())].move;
      const response = await fetch(url);
      const move = (await response.json()) as Move;
      setTimeout(() => {
        dispatch(takeTurn({ target: "player", move }));
      }, 2000);
    }
    next(action);
  };

const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(apiSlice.middleware, opponentMiddleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
