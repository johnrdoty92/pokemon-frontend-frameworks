import classes from "./App.module.css";
import { Controls } from "components/controls";
import { Player } from "components/player";

function App() {
  return (
    <main>
      <section className={classes.gameWindow}>
        <div className={classes.opponent}></div>
        <Player />
      </section>
      <section className={classes.controls}>
        <Controls />
      </section>
    </main>
  );
}

export default App;
