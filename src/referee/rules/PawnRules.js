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
