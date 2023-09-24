import { PlayerSprite } from "components/player/playerSprite";
import classes from "./App.module.css";
import { Controls } from "components/controls";

function App() {
  return (
    <main>
      <section className={classes.gameWindow}>
        <div className={classes.opponent}></div>
        <div className={classes.player}>
          <PlayerSprite />
        </div>
      </section>
      <section className={classes.controls}>
        <Controls />
      </section>
    </main>
  );
}

export default App;
