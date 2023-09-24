import { useAppDispatch, useAppSelector } from "app/store";
import { useGetMoveQuery } from "features/api/apiSlice";
import classes from "./Controls.module.css";
import { setTurn } from "features/gameState/players";

const MoveButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const isPlayerTurn = useAppSelector(
    ({ playerState }) => playerState.turn === "player"
  );
  const { data: move } = useGetMoveQuery({ id });

  const handleMove = () => {
    // TODO: handle move damage
    dispatch(setTurn("opponent"));
  };

  return (
    <button
      disabled={!isPlayerTurn}
      onClick={handleMove}
      className={classes.battleButton}
    >
      {move?.name ?? "Loading..."}
    </button>
  );
};

export const BattleControls = () => {
  const player = useAppSelector((state) => state.playerState.player);

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
