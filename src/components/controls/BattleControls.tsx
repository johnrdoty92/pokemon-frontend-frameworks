import { useAppDispatch, useAppSelector } from "app/store";
import { useGetMoveQuery } from "features/api/apiSlice";
import classes from "./Controls.module.css";
import { reset, takeTurn } from "features/gameState/gameState";

const MoveButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const isPlayerTurn = useAppSelector(({ gameState }) => gameState.isPlayerTurn);
  const isGameOver = useAppSelector(({ gameState }) => gameState.mode === "game-over");
  const { data: move } = useGetMoveQuery({ id });
  const isDisabled = !isPlayerTurn || !move || isGameOver;

  const handleMove = () => {
    if (!move) return;
    dispatch(takeTurn({ target: "opponent", move }));
  };

  return (
    <button disabled={isDisabled} onClick={handleMove} className={classes.optionButton}>
      {move?.name ?? "Loading..."}
    </button>
  );
};

export const BattleControls = () => {
  const player = useAppSelector(({ gameState }) => gameState.player);
  const mode = useAppSelector(({ gameState }) => gameState.mode);
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(reset(null));
  };

  if (!player) {
    return <p>Loading...</p>;
  } else {
    const moves = player.moves.slice(0, 4);
    return (
      <>
        <div className={classes.buttonGroup}>
          {moves.map(({ move: { name, url } }) => {
            const [id] = url.split("/").slice(-2, -1);
            return <MoveButton key={name} id={id} />;
          })}
        </div>
        <button className={classes.actionButton} onClick={handleReset}>
          {mode === "game-over" ? "New Battle" : "Reset"}
        </button>
      </>
    );
  }
};
