import { useAppSelector } from "app/store";
import { IdleControls } from "./IdleControls";
import { BattleControls } from "./BattleControls";

export const Controls = () => {
  const gameState = useAppSelector((state) => state.gameState);

  switch (gameState) {
    case "idle": {
      return <IdleControls />;
    }
    case "battle": {
      return <BattleControls />;
    }
    case "game-over": {
      return;
    }
  }
};
