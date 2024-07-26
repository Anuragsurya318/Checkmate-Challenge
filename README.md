below is my App.jsx component code
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

below is my ChessBoard.jsx component code
import { useRef, useState, useEffect } from "react";
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
import { wb, wn, wq, wr, bb, bn, bq, br } from "../../assets/index.js";

export default function ChessBoard() {
const [activePiece, setActivePiece] = useState(null);
const [grabPosition, setGrabPosition] = useState({ x: -1, y: -1 });
const [promotionPawn, setPromotionPawn] = useState(null);
const [pieces, setPieces] = useState(initialBoardState);
const [highlightedPositions, setHighlightedPositions] = useState([]);
const chessboardRef = useRef(null);
const modalRef = useRef(null);
const referee = new Referee();

useEffect(() => {
if (promotionPawn) {
modalRef.current.style.display = "flex";
} else {
modalRef.current.style.display = "none";
}
}, [promotionPawn]);

function grabPiece(e) {
const element = e.target;
const chessboard = chessboardRef.current;
if (element.classList.contains("chess-piece") && chessboard) {
const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 550) / GRID_SIZE));
setGrabPosition({ x: grabX, y: grabY });

      element.style.width = "68.75px";
      element.style.height = "68.75px";
      element.style.position = "absolute";
      element.classList.add("grabbed");

      setActivePiece(element);
      updateValidMoves(grabX, grabY);
    }

}

function updateValidMoves(x, y) {
const piece = pieces.find((p) => p.x === x && p.y === y);
if (piece) {
const validMoves = referee.getValidMoves(piece, pieces);
setHighlightedPositions(validMoves);
} else {
setHighlightedPositions([]);
}
}

function movePiece(e) {
const chessboard = chessboardRef.current;
if (activePiece && chessboard) {
const chessboardRect = chessboard.getBoundingClientRect();
const pieceSize = 68.75;

      const x = e.clientX - pieceSize / 2;
      const y = e.clientY - pieceSize / 2;

      const minX = chessboardRect.left;
      const minY = chessboardRect.top;
      const maxX = chessboardRect.right - pieceSize;
      const maxY = chessboardRect.bottom - pieceSize;

      activePiece.style.left = `${Math.max(minX, Math.min(x, maxX)) - chessboardRect.left}px`;
      activePiece.style.top = `${Math.max(minY, Math.min(y, maxY)) - chessboardRect.top}px`;
    }

}

function dropPiece(e) {
const chessboard = chessboardRef.current;
if (activePiece && chessboard) {
const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 550) / GRID_SIZE));

      const currentPiece = pieces.find((p) => p.x === grabPosition.x && p.y === grabPosition.y);

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition.x,
          grabPosition.y,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassant = referee.isEnPassantMove(
          grabPosition.x,
          grabPosition.y,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnPassant) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === grabPosition.x && piece.y === grabPosition.y) {
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
            if (piece.x === grabPosition.x && piece.y === grabPosition.y) {
              if (Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN) {
                piece.enPassant = true;
              } else {
                piece.enPassant = false;
              }
              piece.x = x;
              piece.y = y;

              let promotionRow = piece.team === TeamType.OUR ? 7 : 0;

              if (piece.type === PieceType.PAWN && y === promotionRow) {
                setPromotionPawn(piece);
              }
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
          setHighlightedPositions([]);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      activePiece.classList.remove("grabbed");
      setActivePiece(null);
    }

}

function promotePawn(pieceType) {
if (promotionPawn === null) return;
const updatedPieces = pieces.reduce((results, piece) => {
if (piece.x === promotionPawn.x && piece.y === promotionPawn.y) {
piece.type = pieceType;

        if (pieceType === PieceType.ROOK) {
          piece.image = piece.team === TeamType.OUR ? wr : br;
        } else if (pieceType === PieceType.BISHOP) {
          piece.image = piece.team === TeamType.OUR ? wb : bb;
        } else if (pieceType === PieceType.KNIGHT) {
          piece.image = piece.team === TeamType.OUR ? wn : bn;
        } else if (pieceType === PieceType.QUEEN) {
          piece.image = piece.team === TeamType.OUR ? wq : bq;
        }
      }
      results.push(piece);
      return results;
    }, []);

    setPieces(updatedPieces);
    setPromotionPawn(null);

    modalRef.current.classList.add("hidden");

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

      const highlight = highlightedPositions.some((p) => p.x === i && p.y === j);

      const isWhite = number % 2 === 0;
      board.push(<Tile key={`${j},${i}`} image={image} isWhite={isWhite} highlight={highlight} />);
    }

}

return (
<>
<div
        id="pawn-promotion-modal"
        ref={modalRef}
        className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center select-none hidden"
      >
<div className="modal-body w-[550px] h-[225px] z-50 top-48 absolute bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
{promotionPawn?.team === TeamType.OUR ? (
<>
<img
src={wr}
onClick={() => promotePawn(PieceType.ROOK)}
alt="White Rook"
className="h-36 hover:bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer"
/>
<img
src={wb}
onClick={() => promotePawn(PieceType.BISHOP)}
alt="White Bishop"
className="h-36 hover:bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer"
/>
<img
src={wn}
onClick={() => promotePawn(PieceType.KNIGHT)}
alt="White Knight"
className="h-36 hover:bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer"
/>
<img
src={wq}
onClick={() => promotePawn(PieceType.QUEEN)}
alt="White Queen"
className="h-36 hover:bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer"
/>
</>
) : (
<>
<img
src={br}
onClick={() => promotePawn(PieceType.ROOK)}
alt="Black Rook"
className="h-36 hover:bg-[rgba(255,255,255,0.1)] rounded-full cursor-pointer"
/>
<img
src={bb}
onClick={() => promotePawn(PieceType.BISHOP)}
alt="Black Bishop"
className="h-36 hover:bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer"
/>
<img
src={bn}
onClick={() => promotePawn(PieceType.KNIGHT)}
alt="Black Knight"
className="h-36 hover:bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer"
/>
<img
src={bq}
onClick={() => promotePawn(PieceType.QUEEN)}
alt="Black Queen"
className="h-36 hover:bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer"
/>
</>
)}
</div>
</div>
<div
onMouseMove={(e) => movePiece(e)}
onMouseDown={(e) => grabPiece(e)}
onMouseUp={(e) => dropPiece(e)}
id="chessboard"
ref={chessboardRef}
className="w-[550px] h-[550px] flex flex-wrap relative" >
{board}
</div>
</>
);
}

below is my Tile.jsx component code
import React, { useState } from "react";

const Tile = ({ isWhite, image, highlight }) => {
const [isGrabbing, setIsGrabbing] = useState(false);

return (
<div
className={`tile w-[68.75px] h-[68.75px] ${
        isWhite ? "bg-light_tile" : "bg-dark_tile"
      } flex items-center justify-center bg-cover bg-center bg-no-repeat ${
        highlight ? "border-4 border-yellow-500" : ""
      }`}
onMouseDown={() => setIsGrabbing(true)}
onMouseUp={() => setIsGrabbing(false)}
onMouseLeave={() => setIsGrabbing(false)} >
{image && (
<div
style={{ backgroundImage: `url(${image})` }}
className={`chess-piece w-full h-full bg-cover ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`} ></div>
)}
</div>
);
};

export default Tile;

below is my Referee.js code
import {
bishopMove,
getPossibleBishopMoves,
getPossibleKingMoves,
getPossibleKnightMoves,
getPossiblePawnMoves,
getPossibleQueenMoves,
getPossibleRookMoves,
kingMove,
knightMove,
pawnMove,
queenMove,
rookMove,
} from "./rules";

export default class Referee {
isEnPassantMove(px, py, x, y, type, team, boardState) {
const pawnDirection = team === "OUR" ? 1 : -1;

    if (type === "PAWN") {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find((p) => p.x === x && p.y === y - pawnDirection && p.enPassant);
        if (piece) {
          return true;
        }
      }
    }
    return false;

}

isValidMove(px, py, x, y, type, team, boardState) {
let validMove = false;
switch (type) {
case "PAWN":
validMove = pawnMove(px, py, x, y, team, boardState);
break;
case "KNIGHT":
validMove = knightMove(px, py, x, y, team, boardState);
break;
case "BISHOP":
validMove = bishopMove(px, py, x, y, team, boardState);
break;
case "ROOK":
validMove = rookMove(px, py, x, y, team, boardState);
break;
case "QUEEN":
validMove = queenMove(px, py, x, y, team, boardState);
break;
case "KING":
validMove = kingMove(px, py, x, y, team, boardState);
break;
}

    if (!validMove) return false;

    const hypotheticalBoard = boardState.map((p) =>
      p.x === px && p.y === py ? { ...p, x, y } : p
    );

    return !this.isKingInDanger(team, hypotheticalBoard);

}

getValidMoves(piece, boardState, checkKingSafety = true) {
let possibleMoves = [];
switch (piece.type) {
case "PAWN":
possibleMoves = getPossiblePawnMoves(piece, boardState);
break;
case "KNIGHT":
possibleMoves = getPossibleKnightMoves(piece, boardState);
break;
case "BISHOP":
possibleMoves = getPossibleBishopMoves(piece, boardState);
break;
case "ROOK":
possibleMoves = getPossibleRookMoves(piece, boardState);
break;
case "QUEEN":
possibleMoves = getPossibleQueenMoves(piece, boardState);
break;
case "KING":
possibleMoves = getPossibleKingMoves(piece, boardState);
break;
}

    if (piece.type === "KING" && checkKingSafety) {
      return possibleMoves.filter((move) => {
        const hypotheticalBoard = boardState.map((p) =>
          p.x === piece.x && p.y === piece.y ? { ...p, x: move.x, y: move.y } : p
        );
        return !this.isKingInDanger(piece.team, hypotheticalBoard);
      });
    }

    return possibleMoves;

}

isKingInDanger(team, boardState) {
const king = boardState.find((p) => p.type === "KING" && p.team === team);
if (!king) return false;

    for (const piece of boardState) {
      if (piece.team !== team) {
        const possibleMoves = this.getValidMoves(piece, boardState, false);
        if (possibleMoves.some((move) => move.x === king.x && move.y === king.y)) {
          console.log(`King of team ${team} is in danger!`);
          return true;
        }
      }
    }
    return false;

}
}

below is my KingRules.js code
import {
tileIsEmptyOrOccupiedByOpponent,
tileIsOccupied,
tileIsOccupiedByOpponent,
} from "./GeneralRules";

export const kingMove = (px, py, x, y, team, boardState) => {
return (
Math.abs(px - x) <= 1 &&
Math.abs(py - y) <= 1 &&
tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team)
);
};

export const getPossibleKingMoves = (king, boardState) => {
const possibleMoves = [];

const directions = [
{ x: 1, y: 0 },
{ x: -1, y: 0 },
{ x: 0, y: 1 },
{ x: 0, y: -1 },
{ x: 1, y: 1 },
{ x: 1, y: -1 },
{ x: -1, y: 1 },
{ x: -1, y: -1 },
];

directions.forEach((dir) => {
const destination = { x: king.x + dir.x, y: king.y + dir.y };
if (tileIsEmptyOrOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
possibleMoves.push(destination);
}
});

return possibleMoves;
};

below is my GeneralRules.js code
export const tileIsOccupied = (x, y, boardState) => {
const piece = boardState.find((p) => p.x === x && p.y === y);
return piece ? true : false;
};

export const tileIsOccupiedByOpponent = (x, y, boardState, team) => {
const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);
return piece ? true : false;
};

export const tileIsEmptyOrOccupiedByOpponent = (x, y, boardState, team) => {
return !tileIsOccupied(x, y, boardState) || tileIsOccupiedByOpponent(x, y, boardState, team);
};

below is my RookeRules.js code
import {
tileIsEmptyOrOccupiedByOpponent,
tileIsOccupied,
tileIsOccupiedByOpponent,
} from "./GeneralRules";

export const rookMove = (px, py, x, y, team, boardState) => {
if (px === x) {
for (let i = 1; i < 8; i++) {
let multiplier = y < py ? -1 : 1;
let passedY = py + i _ multiplier;
if (px === x && passedY === y) {
if (tileIsEmptyOrOccupiedByOpponent(x, passedY, boardState, team)) {
return true;
}
} else {
if (tileIsOccupied(x, passedY, boardState)) {
break;
}
}
}
}
if (py === y) {
for (let i = 1; i < 8; i++) {
let multiplier = x < px ? -1 : 1;
let passedX = px + i _ multiplier;
if (passedX === x && py === y) {
if (tileIsEmptyOrOccupiedByOpponent(passedX, y, boardState, team)) {
return true;
}
} else {
if (tileIsOccupied(passedX, y, boardState)) {
break;
}
}
}
}
return false;
};

export const getPossibleRookMoves = (rook, boardState) => {
const possibleMoves = [];

// Top movement
for (let i = 1; i < 8; i++) {
const destination = { x: rook.x, y: rook.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }

}

// Bottom movement
for (let i = 1; i < 8; i++) {
const destination = { x: rook.x, y: rook.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }

}

// Left movement
for (let i = 1; i < 8; i++) {
const destination = { x: rook.x - i, y: rook.y };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }

}

// Right movement
for (let i = 1; i < 8; i++) {
const destination = { x: rook.x + i, y: rook.y };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }

}

return possibleMoves;
};

now change the code of the necessary files for short and long castling
