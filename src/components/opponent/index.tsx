import { useAppDispatch, useAppSelector } from "app/store";
import classes from "./Opponent.module.css";
import { Stats } from "components/stats";
import { useGetRandomPokemonQuery } from "features/api/apiSlice";
import { useEffect } from "react";
import { setOpponent } from "features/gameState/players";

export const Opponent = () => {
  const dispatch = useAppDispatch();
  const isBattleState = useAppSelector((state) => state.gameState === "battle");
  const opponentState = useAppSelector((state) => state.playerState.opponent);
  const { data: opponent } = useGetRandomPokemonQuery(undefined, {
    skip: !isBattleState,
  });
  const totalHealth = opponent?.stats.find(({ stat }) => stat.name === "hp")?.base_stat;

  useEffect(() => {
    if (!isBattleState || !opponent) return;
    dispatch(setOpponent(opponent));
  }, [opponent, isBattleState, dispatch]);

  if (!opponentState) {
    return <p>Loading...</p>;
  } else {
    return (
      <section className={classes.playerWindow}>
        <Stats
          name={opponentState.name}
          currentHealth={opponentState.health}
          totalHealth={totalHealth ?? 1}
        />
        <img src={opponentState.sprites.front_default} alt={opponentState.name} />
      </section>
    );
  }
};
