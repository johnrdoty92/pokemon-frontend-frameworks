import "./App.css"
import { Controls } from "components/controls";
import { GameWindow } from "components/gameWindow";

function App() {
  return (
    <main>
      <GameWindow />
      <Controls />
    </main>
  );
}

export default App;
