import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { Move, Pokemon } from "features/api/responseTypes";

type PlayableCharacter = Pokemon & { totalHealth: number; currentHealth: number };

export type GameState =
  | {
      player: null;
      opponent: null;
      isPlayerTurn: null;
      message: string;
      mode: "start-screen";
    }
  | {
      player: PlayableCharacter;
      opponent: PlayableCharacter;
      isPlayerTurn: boolean;
      message: string;
      mode: "battle" | "game-over";
    };

const initialState = {
  player: null,
  opponent: null,
  isPlayerTurn: null,
  message: "Choose a Pokémon!",
  mode: "start-screen",
} as const;

export const gameStateSlice = createSlice<GameState, SliceCaseReducers<GameState>, "gameState">({
  name: "gameState",
  initialState,
  reducers: {
    choosePlayer: (state, { payload }: PayloadAction<{ player: Pokemon; opponent: Pokemon }>) => {
      const { player, opponent } = payload;
      const { stats: playerStats } = player;
      const playerHealth = playerStats.find(({ stat }) => stat.name === "hp")?.base_stat ?? 15;
      const { stats: opponentStats } = opponent;
      const opponentHealth = opponentStats.find(({ stat }) => stat.name === "hp")?.base_stat ?? 15;
      state.mode = "battle";
      state.player = { ...player, totalHealth: playerHealth, currentHealth: playerHealth };
      state.opponent = { ...opponent, totalHealth: opponentHealth, currentHealth: opponentHealth };
      state.isPlayerTurn = true;
      state.message = "Choose an attack!";
    },
    takeTurn: (state, action: PayloadAction<{ target: "player" | "opponent"; move: Move }>) => {
      if (state.mode !== "battle") return state;
      const { target, move } = action.payload;
      // TODO: add modifiers
      state[target].currentHealth -= move.power;
      state.isPlayerTurn = target === "player";
      if (state[target].currentHealth <= 0) {
        state.mode = "game-over";
      }
    },
    updateMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    reset: () => initialState,
  },
});

export const { choosePlayer, takeTurn, updateMessage, reset } = gameStateSlice.actions;

export const gameStateReducer = gameStateSlice.reducer;
