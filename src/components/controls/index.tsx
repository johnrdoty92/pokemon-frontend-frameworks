import { useAppSelector } from "app/store";
import { StartControls } from "./StartControls";
import { BattleControls } from "./BattleControls";
import { GameOverControls } from "./GameOverControls";
import classes from "./Controls.module.css";

const CurrentControls = () => {
  const mode = useAppSelector((state) => state.gameState.mode);

  switch (mode) {
    case "start-screen": {
      return <StartControls />;
    }
    case "battle": {
      return <BattleControls />;
    }
    case "game-over": {
      return <GameOverControls />;
    }
  }
};

export const Controls = () => {
  return (
    <div className={classes.controls}>
      <CurrentControls />
    </div>
  );
};
