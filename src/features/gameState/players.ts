import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "features/api/responseTypes";

type PlayerState = {
  player: (Pokemon & { health: number }) | null;
  opponent: (Pokemon & { health: number }) | null;
  turn: "player" | "opponent";
};

export const playerStateSlice = createSlice<
  PlayerState,
  SliceCaseReducers<PlayerState>,
  "playerState"
>({
  name: "playerState",
  initialState: {
    player: null,
    opponent: null,
    turn: "player",
  },
  reducers: {
    setPlayer: (state, { payload }: PayloadAction<Pokemon>) => {
      const { stats } = payload;
      const health = stats.find(({ stat }) => stat.name === "hp")?.base_stat ?? 15;
      state.player = { ...payload, health };
    },
    setOpponent: (state, { payload }: PayloadAction<Pokemon>) => {
      const { stats } = payload;
      const health = stats.find(({ stat }) => stat.name === "hp")?.base_stat ?? 15;
      state.opponent = { ...payload, health };
    },
    setTurn: (state, action: PayloadAction<PlayerState["turn"]>) => {
      state.turn = action.payload;
    },
    // reset
  },
});

export const { setPlayer, setOpponent, setTurn } = playerStateSlice.actions;

export const playerStateReducer = playerStateSlice.reducer;
