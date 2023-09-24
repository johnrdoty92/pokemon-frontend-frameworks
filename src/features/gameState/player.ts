import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from "@reduxjs/toolkit";
import { Pokemon } from "features/api/responseTypes";

type PlayerState = {
  selectedPokemon: Pokemon | null;
};

export const playerStateSlice = createSlice<
  PlayerState,
  SliceCaseReducers<PlayerState>,
  "playerState"
>({
  name: "playerState",
  initialState: {
    selectedPokemon: null,
  },
  reducers: {
    selectPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.selectedPokemon = action.payload;
    },
    // reset
  },
});

export const { selectPokemon } = playerStateSlice.actions;

export const playerStateReducer = playerStateSlice.reducer;
