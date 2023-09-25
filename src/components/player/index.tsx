import { useAppSelector } from "app/store";
import classes from "./Player.module.css";
import { Stats } from "components/stats";

export const Player = () => {
  const player = useAppSelector((state) => state.gameState.player);
  if (!player) {
    return <p className={classes.startScreenMessage}>Choose a Pokemon...</p>;
  } else {
    const { currentHealth, totalHealth, name } = player;
    return (
      <section className={classes.playerWindow}>
        <img src={player.sprites.back_default} alt={name} />;
        <Stats name={name} currentHealth={currentHealth} totalHealth={totalHealth} />
      </section>
    );
  }
};
