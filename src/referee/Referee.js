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
    return validMove;
  }

  getValidMoves(piece, boardState) {
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
}

// getValidMoves(piece: Piece, boardState: Piece[]) : Position[] {
//   switch(piece.type)
//   {
//     case PieceType.PAWN:
//       return getPossiblePawnMoves(piece, boardState);
//     case PieceType.KNIGHT:
//       return getPossibleKnightMoves(piece, boardState);
//     case PieceType.BISHOP:
//       return getPossibleBishopMoves(piece, boardState);
//     case PieceType.ROOK:
//       return getPossibleRookMoves(piece, boardState);
//     case PieceType.QUEEN:
//       return getPossibleQueenMoves(piece, boardState);
//     case PieceType.KING:
//       return getPossibleKingMoves(piece, boardState);
//     default:
//       return [];
//   }
// }
