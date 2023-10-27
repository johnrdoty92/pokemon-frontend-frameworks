import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Move, Pokemon } from "./responseTypes";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon, { id: string }>({
      query: ({ id }) => `/pokemon/${id}`,
    }),
    getMove: builder.query<Move, { id: string }>({
      query: ({ id }) => `/move/${id}`,
    }),
    getRandomPokemon: builder.query<Pokemon, void>({
      query: () => `/pokemon/${Math.ceil(Math.random() * 251)}`,
    }),
  }),
});

export const { useGetPokemonQuery, useGetMoveQuery, useGetRandomPokemonQuery } =
  apiSlice;
