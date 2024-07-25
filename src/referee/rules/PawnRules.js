import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const pawnMove = (px, py, x, y, team, boardState) => {
  const specialRow = team === "OUR" ? 1 : 6;
  const pawnDirection = team === "OUR" ? 1 : -1;

  // Movement logic
  if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
    if (!tileIsOccupied(x, y, boardState) && !tileIsOccupied(x, y - pawnDirection, boardState)) {
      return true;
    }
  } else if (px === x && y - py === pawnDirection) {
    if (!tileIsOccupied(x, y, boardState)) {
      return true;
    }
  }
  // Attack logic
  else if (x - px === -1 && y - py === pawnDirection) {
    // Attack in upper or bottom left corner
    if (tileIsOccupiedByOpponent(x, y, boardState, team)) {
      return true;
    }
  } else if (x - px === 1 && y - py === pawnDirection) {
    // Attack in the upper or bottom right corner
    if (tileIsOccupiedByOpponent(x, y, boardState, team)) {
      return true;
    }
  }
  return false;
};

export const getPossiblePawnMoves = (pawn, boardState) => {
  const possibleMoves = [];

  const specialRow = pawn.team === "OUR" ? 1 : 6;
  const pawnDirection = pawn.team === "OUR" ? 1 : -1;

  const normalMove = { x: pawn.x, y: pawn.y + pawnDirection };
  const specialMove = { x: normalMove.x, y: normalMove.y + pawnDirection };
  const upperLeftAttack = { x: pawn.x - 1, y: pawn.y + pawnDirection };
  const upperRightAttack = { x: pawn.x + 1, y: pawn.y + pawnDirection };
  const leftPosition = { x: pawn.x - 1, y: pawn.y };
  const rightPosition = { x: pawn.x + 1, y: pawn.y };

  if (!tileIsOccupied(normalMove.x, normalMove.y, boardState)) {
    possibleMoves.push(normalMove);

    if (pawn.y === specialRow && !tileIsOccupied(specialMove.x, specialMove.y, boardState)) {
      possibleMoves.push(specialMove);
    }
  }

  if (tileIsOccupiedByOpponent(upperLeftAttack.x, upperLeftAttack.y, boardState, pawn.team)) {
    possibleMoves.push(upperLeftAttack);
  } else if (!tileIsOccupied(upperLeftAttack.x, upperLeftAttack.y, boardState)) {
    const leftPiece = boardState.find((p) => p === leftPosition.x && p === leftPosition.y);
    if (leftPiece != null && leftPiece.enPassant) {
      possibleMoves.push(upperLeftAttack);
    }
  }

  if (tileIsOccupiedByOpponent(upperRightAttack.x, upperRightAttack.y, boardState, pawn.team)) {
    possibleMoves.push(upperRightAttack);
  } else if (!tileIsOccupied(upperRightAttack.x, upperRightAttack.y, boardState)) {
    const rightPiece = boardState.find((p) => p === rightPosition.x && p === rightPosition.y);
    if (rightPiece != null && rightPiece.enPassant) {
      possibleMoves.push(upperRightAttack);
    }
  }

  return possibleMoves;
};
