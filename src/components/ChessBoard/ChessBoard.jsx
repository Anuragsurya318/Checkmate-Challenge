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

      const isWhite = number % 2 === 0;
      board.push(<Tile key={`${j},${i}`} image={image} isWhite={isWhite} />);
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
        className="w-[550px] h-[550px] flex flex-wrap relative"
      >
        {board}
      </div>
    </>
  );
}
