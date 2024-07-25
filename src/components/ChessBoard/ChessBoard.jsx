import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const PieceType = {
  PAWN: "PAWN",
  BISHOP: "BISHOP",
  KNIGHT: "KNIGHT",
  ROOK: "ROOK",
  QUEEN: "QUEEN",
  KING: "KING",
};

const TeamType = {
  OPPONENT: "OPPONENT",
  OUR: "OUR",
};

const initialBoardState = [];

for (let p = 0; p < 2; p++) {
  const teamType = p === 0 ? TeamType.OPPONENT : TeamType.OUR;
  const type = teamType === TeamType.OPPONENT ? "b" : "w";
  const y = teamType === TeamType.OPPONENT ? 7 : 0;

  initialBoardState.push({
    image: `../../src/assets/${type}r.png`,
    x: 0,
    y,
    type: PieceType.ROOK,
    team: teamType,
  });
  initialBoardState.push({
    image: `../../src/assets/${type}r.png`,
    x: 7,
    y,
    type: PieceType.ROOK,
    team: teamType,
  });
  initialBoardState.push({
    image: `../../src/assets/${type}n.png`,
    x: 1,
    y,
    type: PieceType.KNIGHT,
    team: teamType,
  });
  initialBoardState.push({
    image: `../../src/assets/${type}n.png`,
    x: 6,
    y,
    type: PieceType.KNIGHT,
    team: teamType,
  });
  initialBoardState.push({
    image: `../../src/assets/${type}b.png`,
    x: 2,
    y,
    type: PieceType.BISHOP,
    team: teamType,
  });
  initialBoardState.push({
    image: `../../src/assets/${type}b.png`,
    x: 5,
    y,
    type: PieceType.BISHOP,
    team: teamType,
  });
  initialBoardState.push({
    image: `../../src/assets/${type}q.png`,
    x: 3,
    y,
    type: PieceType.QUEEN,
    team: teamType,
  });
  initialBoardState.push({
    image: `../../src/assets/${type}k.png`,
    x: 4,
    y,
    type: PieceType.KING,
    team: teamType,
  });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: `../../src/assets/bp.png`,
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: `../../src/assets/wp.png`,
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  });
}

export default function ChessBoard() {
  const [activePiece, setActivePiece] = useState(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState(initialBoardState);
  const chessboardRef = useRef(null);
  const referee = new Referee();

  function grabPiece(e) {
    const element = e.target;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 68.75));
      setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 550) / 68.75)));

      element.style.width = "68.75px";
      element.style.height = "68.75px";
      element.style.position = "absolute";
      element.classList.add("grabbed");

      setActivePiece(element);
    }
  }

  function movePiece(e) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      // Get the bounding rectangle of the chessboard
      const chessboardRect = chessboard.getBoundingClientRect();
      const pieceSize = 68.75;

      // Calculate the new position of the piece
      const x = e.clientX - pieceSize / 2;
      const y = e.clientY - pieceSize / 2;

      // Constrain the position within the boundaries of the chessboard
      const minX = chessboardRect.left;
      const minY = chessboardRect.top;
      const maxX = chessboardRect.right - pieceSize;
      const maxY = chessboardRect.bottom - pieceSize;

      // Set the new position, ensuring the piece stays within the chessboard
      activePiece.style.left = `${Math.max(minX, Math.min(x, maxX)) - chessboardRect.left}px`;
      activePiece.style.top = `${Math.max(minY, Math.min(y, maxY)) - chessboardRect.top}px`;
    }
  }

  function dropPiece(e) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 68.75);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 550) / 68.75));

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      const attackedPiece = pieces.find((p) => p.x === x && p.y === y);

      if (currentPiece) {
        const validMove = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassant = referee.isEnPassantMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnPassant) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
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
            if (piece.x === gridX && piece.y === gridY) {
              if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
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

  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      const isWhite = number % 2 === 0;
      board.push(<Tile key={`${j},${i}`} image={image} isWhite={isWhite} />);
    }
  }

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
      className="w-[550px] h-[550px] flex flex-wrap relative"
    >
      {board}
    </div>
  );
}
