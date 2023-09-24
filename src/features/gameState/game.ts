import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

type GameState = "idle" | "battle" | "game-over";

export const gameStateSlice = createSlice<
  GameState,
  { [k: string]: CaseReducer<GameState, PayloadAction<void>> },
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
