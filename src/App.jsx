import React, { useState } from "react";
import ChessBoard from "./components/ChessBoard/ChessBoard";

const App = () => {
  const [gameStatus, setGameStatus] = useState(null);

  const handleOfferDraw = () => {
    if (window.confirm("Do you agree to a draw?")) {
      setGameStatus("Draw");
    }
  };

  const handleResign = (team) => {
    const opponent = team === "White" ? "Black" : "White";
    if (window.confirm(`Are you sure you want to resign?`)) {
      setGameStatus(`${opponent} wins by resignation`);
    }
  };

  return (
    <div className="w-screen h-screen lg:h-auto flex flex-col items-center  justify-center bg-bg_color">
      {gameStatus && <div className="mb-4 mt-10 text-2xl font-bold text-red-600">{gameStatus}</div>}
      <ChessBoard setGameStatus={setGameStatus} />
      <div className="space-x-2 flex my-20 sm:my-10">
        <button
          onClick={handleOfferDraw}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black font-bold rounded"
        >
          Offer Draw
        </button>
        <button
          onClick={() => handleResign("White")}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-black font-bold rounded"
        >
          Resign (White)
        </button>
        <button
          onClick={() => handleResign("Black")}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-black font-bold rounded"
        >
          Resign (Black)
        </button>
      </div>
    </div>
  );
};

export default App;
