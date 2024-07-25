import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove = (px, py, x, y, team, boardState) => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // Top and bottom side movement
      if (y - py === 2 * i) {
        if (x - px === j) {
          if (tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team)) {
            return true;
          }
        }
      }
      // Right and left side movement
      if (x - px === 2 * i) {
        if (y - py === j) {
          if (tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const getPossibleKnightMoves = (knight, boardState) => {
  const possibleMoves = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = { x: knight.x + j, y: knight.y + i * 2 };
      const horizontalMove = { x: knight.x + i * 2, y: knight.y + j };
      if (
        tileIsEmptyOrOccupiedByOpponent(verticalMove.x, verticalMove.y, boardState, knight.team)
      ) {
        possibleMoves.push(verticalMove);
      }
      if (
        tileIsEmptyOrOccupiedByOpponent(horizontalMove.x, horizontalMove.y, boardState, knight.team)
      ) {
        possibleMoves.push(horizontalMove);
      }
    }
  }
  return possibleMoves;
};
