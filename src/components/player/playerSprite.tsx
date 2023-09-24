import { useAppSelector } from "app/store";

export const PlayerSprite = () => {
  const pokemon = useAppSelector((state) => state.playerState.selectedPokemon);
  if (!pokemon) {
    return <p>Choose a Pokemon...</p>;
  } else {
    return <img src={pokemon.sprites.back_default} alt={pokemon.name} />;
  }
};
