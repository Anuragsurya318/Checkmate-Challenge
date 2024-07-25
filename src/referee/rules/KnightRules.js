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
