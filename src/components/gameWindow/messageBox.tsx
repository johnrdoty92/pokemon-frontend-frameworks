import { useAppSelector } from "app/store";
import classes from "./GameWindow.module.css";

export const MessageBox = () => {
  const message = useAppSelector((state) => state.gameState.message);
  const { opponent, player } = useAppSelector(({ gameState: { opponent, player } }) => ({
    opponent,
    player,
  }));
  const gameOverMessage =
    (opponent?.currentHealth ?? 1) <= 0
      ? "Player wins!"
      : (player?.currentHealth ?? 1) <= 0
      ? "Opponent wins!"
      : "";
  return <div className={classes.message}>{gameOverMessage || message}</div>;
};
