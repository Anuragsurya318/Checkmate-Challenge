import React from "react";
import "../../index.css";

const Pieces = () => {
  const position = new Array(8).fill(null).map(() => new Array(8).fill(null));

  position[0][0] = "wr";
  position[7][7] = "br";

  console.log(position);
  return (
    <div
      className="pieces border-2 border-blue-950 absolute right-0 top-0
       bg-red-600 opacity-75"
      style={{ left: `calc(0.25 * var(--tile-size))`, bottom: `calc(0.25 * var(--tile-size))` }}
    >
      {position.map((r, rank) =>
        r.map((f, file) => (position[rank][file] ? position[rank][file] : null))
      )}
    </div>
  );
};

export default Pieces;
