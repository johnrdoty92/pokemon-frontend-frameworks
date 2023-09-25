import { useAppSelector } from "app/store";
import { StartControls } from "./StartControls";
import { BattleControls } from "./BattleControls";

export const Controls = () => {
  const mode = useAppSelector((state) => state.gameState.mode);

  switch (mode) {
    case "start-screen": {
      return <StartControls />;
    }
    case "battle": {
      return <BattleControls />;
    }
    case "game-over": {
      return;
    }
  }
};
