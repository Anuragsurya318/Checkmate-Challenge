import React, { isValidElement, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee";

const initialBoardState = [];
const basePath = "../../src/assets/";
const pieceTypes = ["r", "n", "b", "q", "k", "b", "n", "r"];
const PIECETYPES = {
  r: "rook",
  n: "knight",
  b: "bishop",
  q: "queen",
  k: "king",
  p: "pawn",
};

// Adding pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({ x: i, y: 1, image: `${basePath}wp.png`, type: "pawn" });
  initialBoardState.push({ x: i, y: 6, image: `${basePath}bp.png`, type: "pawn" });
}

// Adding major pieces
for (let i = 0; i < pieceTypes.length; i++) {
  initialBoardState.push({
    x: i,
    y: 0,
    image: `${basePath}w${pieceTypes[i]}.png`,
    type: PIECETYPES[pieceTypes[i]],
  });
  initialBoardState.push({
    x: i,
    y: 7,
    image: `${basePath}b${pieceTypes[i]}.png`,
    type: PIECETYPES[pieceTypes[i]],
  });
}

console.log(initialBoardState);

const ChessBoard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [pieces, setPieces] = useState(initialBoardState);
  const referee = new Referee();

  const chessBoardRef = useRef(null);

  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];

  const board = [];

  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      let image = undefined; // Reset image for each tile
      const isWhite = (i + j) % 2 === 0;

      pieces.forEach((piece) => {
        if (piece.x === j && piece.y === i) {
          image = piece.image;
        }
      });

      const position = `${horizontalAxis[j]}${verticalAxis[7 - i]}`;
      row.push({ position, isWhite, image }); // Include image in the tile data
    }
    board.push(row);
  }

  const grabPiece = (e) => {
    if (e.target.classList.contains("chess-piece")) {
      setIsDragging(true);
      setDraggedElement(e.target);
      // Adjust the piece's position so it's centered under the cursor
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.target.style.position = "absolute";
      e.target.style.margin = "0";
      e.target.setAttribute("data-offset-x", offsetX);
      e.target.setAttribute("data-offset-y", offsetY);
      // Explicitly set the width and height to prevent stretching
      e.target.style.width = `${rect.width}px`;
      e.target.style.height = `${rect.height}px`;
      // Adjust the zIndex if needed to ensure the piece is above other elements
      e.target.style.zIndex = "1000";
    }
  };

  const movePiece = (e) => {
    const chessboard = chessBoardRef.current;
    if (isDragging && draggedElement && chessboard) {
      const offsetX = parseInt(draggedElement.getAttribute("data-offset-x"), 10);
      const offsetY = parseInt(draggedElement.getAttribute("data-offset-y"), 10);
      const rect = chessboard.getBoundingClientRect();

      // Calculate new position
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // Boundary checks
      const pieceRect = draggedElement.getBoundingClientRect();
      if (x < rect.left) x = rect.left;
      if (x + pieceRect.width > rect.right) x = rect.right - pieceRect.width;
      if (y < rect.top) y = rect.top;
      if (y + pieceRect.height > rect.bottom) y = rect.bottom - pieceRect.height;

      // Update position
      draggedElement.style.left = `${x - rect.left}px`;
      draggedElement.style.top = `${y - rect.top}px`;
    }
  };

  const releasePiece = (e) => {
    if (isDragging && draggedElement) {
      const chessboard = chessBoardRef.current;
      const rect = chessboard.getBoundingClientRect();
      const tileSize = rect.width / 8;

      const offsetX = parseInt(draggedElement.getAttribute("data-offset-x"), 10);
      const offsetY = parseInt(draggedElement.getAttribute("data-offset-y"), 10);
      let x = e.clientX - offsetX - rect.left;
      let y = e.clientY - offsetY - rect.top;

      // Boundary checks and snapping to grid
      if (x < 0) x = 0;
      if (x > rect.width - tileSize) x = rect.width - tileSize;
      if (y < 0) y = 0;
      if (y > rect.height - tileSize) y = rect.height - tileSize;

      const gridX = Math.floor(x / tileSize);
      const gridY = Math.floor(y / tileSize);

      setPieces((currentPieces) => {
        const updatedPieces = currentPieces.map((p) => {
          console.log(referee.isValidMove(gridX, gridY, x, y, p.type));
          if (p.x === gridX && p.y === 7 - gridY) {
            console.log("Updating piece position");
            const updatedPiece = { ...p };
            updatedPiece.x = gridX;
            updatedPiece.y = 7 - gridY;
            return updatedPiece;
          }
          return p;
        });
        return updatedPieces;
      });

      // Snap the piece to the center of the tile
      draggedElement.style.left = `${
        gridX * tileSize + tileSize / 2 - draggedElement.offsetWidth / 2
      }px`;
      draggedElement.style.top = `${
        gridY * tileSize + tileSize / 2 - draggedElement.offsetHeight / 2
      }px`;

      setIsDragging(false);
      setDraggedElement(null);
    }
  };

  return (
    <div
      className="board bg-light_tile w-[550px] h-[550px] relative"
      onMouseMove={movePiece}
      onMouseUp={releasePiece}
      onMouseLeave={releasePiece}
      ref={chessBoardRef}
    >
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map(({ isWhite, image }, j) => (
            <div
              key={j}
              className="chess-piece" // Ensure this class is on your pieces
              onMouseDown={grabPiece}
            >
              <Tile isWhite={isWhite} image={image} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
