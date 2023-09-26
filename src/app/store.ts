import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "features/api/apiSlice";
import { gameStateReducer, takeTurn, updateMessage } from "features/gameState/gameState";
import { Move } from "features/api/responseTypes";

const opponentMiddleware: Middleware<{}, RootState> =
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
      setTimeout(() => {
        dispatch(updateMessage("Choose an attack!"));
      }, 3000);
    }
    next(action);
  };

const moveMessageMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const { gameState } = getState();
    if (action.type === "gameState/takeTurn" && gameState.mode === "battle") {
      const target = gameState.isPlayerTurn ? "player" : "opponent";
      const message = `${gameState[target].name.replace(/[\w]/i, (m) => m.toUpperCase())} used ${
        action.payload.move.name
      }!`;
      dispatch(updateMessage(message));
      setTimeout(() => next(action), 200);
    } else {
      next(action);
    }
  };

const rootReducer = combineReducers({
  gameState: gameStateReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      apiSlice.middleware,
      moveMessageMiddleware,
      opponentMiddleware
    );
  },
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
