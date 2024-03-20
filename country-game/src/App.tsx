import "./App.css";
import { MatchGame } from "./match-game";

function App() {
  return (
    <div className="App">
      <MatchGame
        data={{
          Germany: "Berlin",
          Mexico: "Mexico City",
          Iran: "Tehran",
          Sumer: "Ur",
          Egypt: "Cairo",
        }}
      />
    </div>
  );
}

export default App;
