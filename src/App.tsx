import classes from "./App.module.css";
import { Controls } from "components/controls";
import { Opponent } from "components/opponent";
import { Player } from "components/player";

function App() {
  return (
    <main>
      <section className={classes.gameWindow}>
        <Opponent />
        <Player />
      </section>
      <section className={classes.controls}>
        <Controls />
      </section>
    </main>
  );
}

export default App;
