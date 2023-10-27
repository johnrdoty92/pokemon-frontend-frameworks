import { useAppDispatch } from "app/store";
import { useGetPokemonQuery, useGetRandomPokemonQuery } from "features/api/apiSlice";
import { choosePlayer } from "features/gameState/gameState";
import { useState } from "react";
import classes from "./Controls.module.css";

type SelectPokemonButtonProps = {
  id: string;
};
const SelectPokemonButton = ({ id }: SelectPokemonButtonProps) => {
  const { data: player, isSuccess, isLoading } = useGetPokemonQuery({ id });
  const { data: opponent } = useGetRandomPokemonQuery();
  const dispatch = useAppDispatch();

  const label = isLoading ? "Loading..." : isSuccess ? player.name : "Error";
  const isDisabled = isLoading || !player || !opponent;

  const handleClick = () => {
    if (isDisabled) return;
    dispatch(choosePlayer({ player, opponent }));
  };

  return (
    <button disabled={isDisabled} className={classes.optionButton} onClick={handleClick}>
      {label}
    </button>
  );
};

const getFourRandomIds = () => {
  const ids: string[] = [];
  while (ids.length < 4) {
    const randomId = Math.ceil(Math.random() * 251).toString();
    if (ids.find((id) => id === randomId)) continue;
    ids.push(randomId);
  }
  return ids;
};

export const StartControls = () => {
  const [randomIds, setRandomIds] = useState(getFourRandomIds);

  const handleRefresh = () => {
    setRandomIds(getFourRandomIds());
  };

  return (
    <>
      <div className={classes.buttonGroup}>
        {randomIds.map((id) => {
          return <SelectPokemonButton key={id} id={id} />;
        })}
      </div>
      <button className={classes.actionButton} onClick={handleRefresh}>
        Refresh
      </button>
    </>
  );
};
