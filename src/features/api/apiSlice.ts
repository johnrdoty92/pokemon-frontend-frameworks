import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Move, Pokemon } from "./responseTypes";

const baseUrl = "https://pokeapi.co/api/v2";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon, { id: string }>({
      query: ({ id }) => `/pokemon/${id}`,
    }),
    getMove: builder.query<Move, { id: string }>({
      query: ({ id }) => `/move/${id}`,
    }),
    getRandomPokemon: builder.query<Pokemon, void>({
      query: () => `/pokemon/${Math.ceil(Math.random() * 1015)}`,
    }),
  }),
});

export const { useGetPokemonQuery, useGetMoveQuery, useGetRandomPokemonQuery } =
  apiSlice;
