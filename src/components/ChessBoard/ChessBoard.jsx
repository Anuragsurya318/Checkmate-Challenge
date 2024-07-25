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
  const [activePiece, setActivePiece] = useState(null);
  const [grabPosition, setGrabPosition] = useState({ x: -1, y: -1 });
  // const [grabPosition.x, setgrabPosition.x] = useState(0);
  // const [grabPosition.y, setgrabPosition.y] = useState(0);
  const [pieces, setPieces] = useState(initialBoardState);
  const chessboardRef = useRef(null);
  const referee = new Referee();

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

  // he called x and y as position.x and position.y respectively...
  // he called piece.x and piece.y as piece.position.x and piece.position.y respectively...
  // he called p.x and p.y as p.position.x and p.position.y respectively...

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
