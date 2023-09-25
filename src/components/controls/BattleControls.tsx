import { useAppDispatch, useAppSelector } from "app/store";
import { useGetMoveQuery } from "features/api/apiSlice";
import classes from "./Controls.module.css";
import { takeTurn } from "features/gameState/gameState";

const MoveButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const isPlayerTurn = useAppSelector(({ gameState }) => gameState.isPlayerTurn);
  const { data: move } = useGetMoveQuery({ id });
  const isDisabled = !isPlayerTurn || !move;

  const handleMove = () => {
    if (!move) return;
    dispatch(takeTurn({ target: "opponent", move }));
  };

  return (
    <button disabled={isDisabled} onClick={handleMove} className={classes.battleButton}>
      {move?.name ?? "Loading..."}
    </button>
  );
};

export const BattleControls = () => {
  const player = useAppSelector(({ gameState }) => gameState.player);

  if (!player) {
    return <p>Loading...</p>;
  } else {
    const moves = player.moves.slice(0, 4);
    return (
      <div className={classes.battleControls}>
        {moves.map(({ move: { name, url } }) => {
          const [id] = url.split("/").slice(-2, -1);
          return <MoveButton key={name} id={id} />;
        })}
      </div>
    );
  }
};
