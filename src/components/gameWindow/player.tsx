import { useAppSelector } from "app/store";
import classes from "./GameWindow.module.css";
import { Stats } from "components/stats";

export const Player = () => {
  const player = useAppSelector((state) => state.gameState.player);
  const isActive = useAppSelector(
    ({ gameState }) => gameState.isPlayerTurn && gameState.mode === "battle"
  );
  if (!player) {
    return <section className={classes.pokemonRow}></section>;
  } else {
    const { currentHealth, totalHealth, name } = player;
    return (
      <section className={classes.pokemonRow}>
        <img
          className={isActive ? classes.activeCharacter : undefined}
          src={player.sprites.back_default}
          alt={name}
        />
        <Stats name={name} currentHealth={currentHealth} totalHealth={totalHealth} />
      </section>
    );
  }
};
