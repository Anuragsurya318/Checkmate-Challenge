import React from "react";
import ChessBoard from "./components/ChessBoard/ChessBoard";

const App = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-bg_color">
      <ChessBoard />
    </div>
  );
};

export default App;
