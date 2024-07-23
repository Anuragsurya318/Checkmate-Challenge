import React from "react";
import { getCharacter } from "../../helper";
import Files from "./bits/Files";
import Ranks from "./bits/Ranks";
import Pieces from "../Pieces/Pieces";

const Board = () => {
  const getClassName = (i, j) => {
    return (i + j) % 2 === 0 ? "bg-dark_tile" : "bg-light_tile";
  };

  const ranks = Array(8)
    .fill(null)
    .map((x, i) => 8 - i);
  const files = Array(8)
    .fill(null)
    .map((x, i) => i + 1);

  return (
    <div className="board flex flex-col items-center justify-center m-4">
      <div className="flex">
        <Ranks ranks={ranks} />
        <table className="tiles border-separate border-spacing-0 border-2 border-red-500">
          <tbody>
            {ranks.map((rank, i) => (
              <tr key={rank}>
                {files.map((file, j) => (
                  <td
                    key={file + rank}
                    className={getClassName(9 - i, j) + " w-tile-size h-tile-size"}
                  >
                    {rank + file}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <Pieces className="absolute inset-0 w-full h-full" />
        </table>
      </div>
      <Files files={files} />
    </div>
  );
};

export default Board;
