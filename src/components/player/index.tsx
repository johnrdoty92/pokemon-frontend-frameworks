import { useAppSelector } from "app/store";
import classes from "./Player.module.css";
import { Stats } from "components/stats";

export const Player = () => {
  const pokemon = useAppSelector((state) => state.playerState.selectedPokemon);
  const totalHealth = pokemon?.stats.find(
    ({ stat }) => stat.name === "hp"
  )?.base_stat;
  if (!pokemon) {
    return <p>Choose a Pokemon...</p>;
  } else {
    return (
      <section className={classes.playerWindow}>
        <img src={pokemon.sprites.back_default} alt={pokemon.name} />;
        <Stats
          name={pokemon.name}
          currentHealth={10}
          totalHealth={totalHealth ?? 1}
        />
      </section>
    );
  }
};
