import { useAppSelector } from "app/store";
import { IdleControls } from "./IdleControls";

export const Controls = () => {
  const gameState = useAppSelector((state) => state.gameState);

  switch (gameState) {
    case "idle": {
      return <IdleControls />;
    }
    case "battle": {
      return;
    }
    case "game-over": {
      return;
    }
  }
};
