import { useAppSelector } from "app/store";
import classes from "./GameWindow.module.css";
import { Stats } from "components/stats";

export const Opponent = () => {
  const opponent = useAppSelector((state) => state.gameState.opponent);

  if (!opponent) return <section className={classes.pokemonRow}></section>;
  const { currentHealth, totalHealth, name } = opponent;
  return (
    <section className={classes.pokemonRow}>
      <Stats name={name} currentHealth={currentHealth} totalHealth={totalHealth} />
      <img src={opponent.sprites.front_default} alt={name} />
    </section>
  );
};