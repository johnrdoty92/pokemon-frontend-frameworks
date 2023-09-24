import { useAppSelector } from "app/store";
import classes from "./Opponent.module.css";
import { Stats } from "components/stats";
import { useGetRandomPokemonQuery } from "features/api/apiSlice";

export const Opponent = () => {
  const isBattleState = useAppSelector((state) => state.gameState === "battle");
  const { data: opponent } = useGetRandomPokemonQuery(undefined, {
    skip: !isBattleState,
  });
  const totalHealth = opponent?.stats.find(
    ({ stat }) => stat.name === "hp"
  )?.base_stat;

  if (!opponent) {
    return <p>Loading...</p>;
  } else {
    return (
      <section className={classes.playerWindow}>
        <Stats
          name={opponent.name}
          currentHealth={10}
          totalHealth={totalHealth ?? 1}
        />
        <img src={opponent.sprites.front_default} alt={opponent.name} />
      </section>
    );
  }
};
