import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="font-sofia w-full h-full">
        <Board />
      </div>
    </>
  );
}

export default App;
