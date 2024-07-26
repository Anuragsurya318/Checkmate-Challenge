import React, { useState } from "react";
import ChessBoard from "../ChessBoard/ChessBoard";
import { initialBoardState } from "../../Constants";
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
} from "../../referee/rules";

const Referee = () => {
  const [pieces, setPieces] = useState(initialBoardState);

  function updatePossibleMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        return currentPieces.map((p) => {
          p.possibleMoves = getValidMoves(p, currentPieces);

          return p;
        });
      });
    });
  }

  function getValidMoves(piece, boardState) {
    switch (piece.type) {
      case "PAWN":
        return getPossiblePawnMoves(piece, boardState);
      case "KNIGHT":
        return getPossibleKnightMoves(piece, boardState);
      case "BISHOP":
        return getPossibleBishopMoves(piece, boardState);
      case "ROOK":
        return getPossibleRookMoves(piece, boardState);
      case "QUEEN":
        return getPossibleQueenMoves(piece, boardState);
      case "KING":
        return getPossibleKingMoves(piece, boardState);
      default:
        return [];
    }
  }

  function isEnPassantMove(px, py, x, y, type, team, boardState) {
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

  function isValidMove(px, py, x, y, type, team, boardState) {
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
    return validMove;
  }

  // function updateValidMoves(x, y) {
  //   const piece = pieces.find((p) => p.x === x && p.y === y);
  //   if (piece) {
  //     const validMoves = referee.getValidMoves(piece, pieces);
  //     setHighlightedPositions(validMoves);
  //   } else {
  //     setHighlightedPositions([]);
  //   }
  // }

  function playMove(piece, x, y) {
    const validMove = isValidMove(
      grabPosition.x,
      grabPosition.y,
      x,
      y,
      currentPiece.type,
      currentPiece.team,
      pieces
    );

    const isEnPassant = isEnPassantMove(
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

  return (
    <>
      <ChessBoard updatePossibleMoves={updatePossibleMoves} playMove={playMove} pieces={pieces} />
    </>
  );
};

export default Referee;
