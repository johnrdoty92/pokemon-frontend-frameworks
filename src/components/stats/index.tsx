import classes from "./Stats.module.css";
import { clsx } from "clsx";

type StatsProps = {
  name: string;
  totalHealth: number;
  currentHealth: number;
};

export const Stats = ({ totalHealth, currentHealth, name }: StatsProps) => {
  const width = Math.min(Math.max(currentHealth / totalHealth, 0), 1) * 100;
  const color =
    width < 30 ? classes.lowHealth : width < 50 ? classes.midHealth : classes.highHealth;
  return (
    <div className={classes.stats}>
      <p className={classes.name}>{name}</p>
      <div className={classes.healthbarContainer}>
        <div style={{ width: `${width}%` }} className={clsx(classes.healthbar, color)}></div>
      </div>
    </div>
  );
};
