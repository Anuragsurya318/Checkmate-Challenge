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
        if (validMove && Math.abs(px - x) === 2) {
          this.handleCastling(px, py, x, y, team, boardState);
        }
        break;
    }

    if (!validMove) return false;

    const hypotheticalBoard = boardState.map((p) =>
      p.x === px && p.y === py ? { ...p, x, y } : p
    );

    return !this.isKingInDanger(team, hypotheticalBoard);
  }

  handleCastling(px, py, x, y, team, boardState) {
    const rookX = x > px ? 7 : 0; // Rook position depending on king side or queen side castling
    const rookNewX = x > px ? x - 1 : x + 1;
    const rook = boardState.find(
      (p) => p.x === rookX && p.y === py && p.type === "ROOK" && p.team === team
    );
    if (rook) {
      rook.x = rookNewX;
    }
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

  isCheckmate(team, boardState) {
    const king = boardState.find((p) => p.type === "KING" && p.team === team);
    if (!king) return false;

    const validMoves = this.getValidMoves(king, boardState);
    if (validMoves.length > 0) return false; // If there are valid moves, not checkmate

    return this.isKingInDanger(team, boardState); // Check if the king is still in danger
  }

  isStalemate(team, boardState) {
    const pieces = boardState.filter((p) => p.team === team);
    const hasLegalMove = pieces.some((piece) => {
      const validMoves = this.getValidMoves(piece, boardState);
      return validMoves.length > 0;
    });
    return !hasLegalMove && !this.isKingInDanger(team, boardState);
  }
}
