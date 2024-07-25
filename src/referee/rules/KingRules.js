import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export const kingMove = (px, py, x, y, team, boardState) => {
  for (let i = 1; i < 2; i++) {
    // Determine the direction of movement
    let multiplierX = x < px ? -1 : x > px ? 1 : 0;
    let multiplierY = y < py ? -1 : y > py ? 1 : 0;

    // Calculate the passed position
    let passedX = px + i * multiplierX;
    let passedY = py + i * multiplierY;

    if (passedX === x && passedY === y) {
      if (tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
        return true;
      }
    } else {
      if (tileIsOccupied(passedX, passedY, boardState)) {
        break;
      }
    }
  }
  return false;
};
