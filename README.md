```javascript
import React from "react";

const Tile = ({ isWhite, image, onClick }) => {
  return (
    <div
      className={`tile w-[68.75px] h-[68.75px] ${
        isWhite ? "bg-light_tile" : "bg-dark_tile"
      } flex items-center justify-center bg-cover bg-center bg-no-repeat`}
      onClick={onClick}
    >
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="chess-piece w-full h-full bg-cover cursor-pointer transform rotate-180"
        ></div>
      )}
    </div>
  );
};

export default Tile;
```

```javascript
import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee";
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  PieceType,
  TeamType,
  initialBoardState,
} from "../../Constants";

export default function ChessBoard() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [pieces, setPieces] = useState(initialBoardState);
  const chessboardRef = useRef(null);
  const referee = new Referee();

  function selectPiece(x, y) {
    const piece = pieces.find((p) => p.x === x && p.y === y);
    if (piece) {
      setSelectedPiece(piece);
    }
  }

  function movePiece(x, y) {
    if (selectedPiece) {
      const validMove = referee.isValidMove(
        selectedPiece.x,
        selectedPiece.y,
        x,
        y,
        selectedPiece.type,
        selectedPiece.team,
        pieces
      );

      const isEnPassant = referee.isEnPassantMove(
        selectedPiece.x,
        selectedPiece.y,
        x,
        y,
        selectedPiece.type,
        selectedPiece.team,
        pieces
      );

      const pawnDirection = selectedPiece.team === TeamType.OUR ? 1 : -1;

      if (isEnPassant) {
        const updatedPieces = pieces.reduce((results, piece) => {
          if (piece === selectedPiece) {
            piece.enPassant = false;
            piece.x = x;
            piece.y = y;
            results.push(piece);
          } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
            if (piece.type === PieceType.PAWN) {
              piece.enPassant = false;
            }
            results.push(piece);
          }
          return results;
        }, []);

        setPieces(updatedPieces);
      } else if (validMove) {
        const updatedPieces = pieces.reduce((results, piece) => {
          if (piece === selectedPiece) {
            if (Math.abs(selectedPiece.y - y) === 2 && piece.type === PieceType.PAWN) {
              piece.enPassant = true;
            } else {
              piece.enPassant = false;
            }
            piece.x = x;
            piece.y = y;
            results.push(piece);
          } else if (!(piece.x === x && piece.y === y)) {
            if (piece.type === PieceType.PAWN) {
              piece.enPassant = false;
            }
            results.push(piece);
          }
          return results;
        }, []);

        setPieces(updatedPieces);
      }
      setSelectedPiece(null);
    } else {
      selectPiece(x, y);
    }
  }

  const board = [];

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      const isWhite = number % 2 === 0;
      board.push(
        <Tile key={`${j},${i}`} image={image} isWhite={isWhite} onClick={() => movePiece(i, j)} />
      );
    }
  }

  return (
    <div
      id="chessboard"
      ref={chessboardRef}
      className="w-[550px] h-[550px] flex flex-wrap relative transform rotate-180"
    >
      {board}
    </div>
  );
}
```
