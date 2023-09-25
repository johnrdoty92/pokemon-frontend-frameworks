import { useAppSelector } from "app/store";
import classes from "./GameWindow.module.css";

export const MessageBox = () => {
  const message = useAppSelector((state) => state.gameState.message);
  return <div className={classes.message}>{message}</div>;
};
