import classes from "./App.module.css";

function App() {
  return (
    <main>
      <section className={classes.gameWindow}>
        <div className={classes.opponent}></div>
        <div className={classes.player}></div>
      </section>
      <section className={classes.controls}></section>
    </main>
  );
}

export default App;
