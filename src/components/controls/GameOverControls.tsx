import { useAppDispatch } from "app/store";
import { reset } from "features/gameState/gameState";

export const GameOverControls = () => {
  const dispatch = useAppDispatch();
  // TODO: figure out who the winner is and remove null arg
  const handleClick = () => {
    dispatch(reset(null));
  };
  return (
    <div>
      <p>Game over!</p>
      <button onClick={handleClick}>New battle</button>
    </div>
  );
};
