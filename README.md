import React, { useRef, useState } from "react";
import Tile from "../Tile/Tile";

const initialBoardState = [];
const basePath = "../../src/assets/";
const pieceTypes = ["r", "n", "b", "q", "k", "b", "n", "r"];

// Adding pawns
for (let i = 0; i < 8; i++) {
initialBoardState.push({ x: i, y: 1, image: `${basePath}wp.png` });
initialBoardState.push({ x: i, y: 6, image: `${basePath}bp.png` });
}

// Adding major pieces
for (let i = 0; i < pieceTypes.length; i++) {
initialBoardState.push({ x: i, y: 0, image: `${basePath}w${pieceTypes[i]}.png` });
initialBoardState.push({ x: i, y: 7, image: `${basePath}b${pieceTypes[i]}.png` });
}

const ChessBoard = () => {
const [isDragging, setIsDragging] = useState(false);
const [draggedElement, setDraggedElement] = useState(null);
const [pieces, setPieces] = useState(initialBoardState);

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
const offsetX = parseInt(draggedElement.getAttribute("data-offset-x"), 10);
const offsetY = parseInt(draggedElement.getAttribute("data-offset-y"), 10);
const x = e.clientX - offsetX - rect.left;
const y = e.clientY - offsetY - rect.top;

      const tileSize = rect.width / 8;

      const gridX = Math.floor(x / tileSize);
      const gridY = Math.floor(y / tileSize);

      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.image === draggedElement.getAttribute("src")) {
            p.x = gridX;
            p.y = 7 - gridY; // Adjust for the coordinate system
          }
          return p;
        });
        return pieces;
      });

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
onMouseDown={grabPiece} >
<Tile isWhite={isWhite} image={image} />
</div>
))}
</div>
))}
</div>
);
};

export default ChessBoard;
