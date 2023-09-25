import { useAppSelector } from "app/store";
import { StartControls } from "./StartControls";
import { BattleControls } from "./BattleControls";
import classes from "./Controls.module.css";

const CurrentControls = () => {
  const mode = useAppSelector((state) => state.gameState.mode);

  switch (mode) {
    case "start-screen": {
      return <StartControls />;
    }
    case "game-over":
    case "battle": {
      return <BattleControls />;
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
