import { Opponent } from "./opponent";
import { Player } from "./player";
import classes from "./GameWindow.module.css";
import { MessageBox } from "./messageBox";

export const GameWindow = () => {
  return (
    <div className={classes.gameWindow}>
      <div className={classes.pokemonRows}>
        <Opponent />
        <Player />
      </div>
      <MessageBox />
    </div>
  );
};
