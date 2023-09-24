import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";

type GameState = "idle" | "battle" | "game-over";

export const gameStateSlice = createSlice<
  GameState,
  SliceCaseReducers<GameState>,
  "gameState"
>({
  name: "gameState",
  initialState: "idle",
  reducers: {
    idle: () => "idle",
    battle: () => "battle",
    gameOver: () => "game-over",
  },
});

export const { idle, battle, gameOver } = gameStateSlice.actions;

export const gameStateReducer = gameStateSlice.reducer;
