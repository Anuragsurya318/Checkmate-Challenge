import { bishopMove, kingMove, knightMove, pawnMove, queenMove, rookMove } from "./rules";

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
}
