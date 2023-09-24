import { useAppDispatch } from "app/store";
import { useGetPokemonQuery } from "features/api/apiSlice";
import { battle } from "features/gameState/game";
import { selectPokemon } from "features/gameState/player";
import { useState } from "react";
import classes from "./Controls.module.css";

type SelectPokemonButtonProps = {
  id: string;
};
const SelectPokemonButton = ({ id }: SelectPokemonButtonProps) => {
  const { data: pokemon, isSuccess, isLoading } = useGetPokemonQuery({ id });
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!pokemon) return;
    dispatch(selectPokemon(pokemon));
    dispatch(battle());
  };

  const label = isLoading ? "Loading..." : isSuccess ? pokemon.name : "Error";

  return (
    <button className={classes.selectButton} onClick={handleClick}>
      {label}
    </button>
  );
};

const getFourRandomIds = () => {
  const ids: string[] = [];
  while (ids.length < 4) {
    const randomId = Math.ceil(Math.random() * 1015).toString();
    if (ids.find((id) => id === randomId)) continue;
    ids.push(randomId);
  }
  return ids;
};

export const IdleControls = () => {
  const [randomIds, setRandomIds] = useState(getFourRandomIds);

  const handleRefresh = () => {
    setRandomIds(getFourRandomIds());
  };
  return (
    <>
      <div className={classes.selectPokemonGroup}>
        {randomIds.map((id) => {
          return <SelectPokemonButton key={id} id={id} />;
        })}
      </div>
      <button className={classes.refreshButton} onClick={handleRefresh}>
        Refresh
      </button>
    </>
  );
};
