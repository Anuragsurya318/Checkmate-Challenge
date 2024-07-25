import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export const queenMove = (px, py, x, y, team, boardState) => {
  for (let i = 1; i < 8; i++) {
    // Determine the direction of movement
    let multiplierX;
    let multiplierY;

    if (x < px) {
      multiplierX = -1;
    } else if (x > px) {
      multiplierX = 1;
    } else {
      // X value is unchanged
      multiplierX = 0;
    }

    if (y < py) {
      multiplierY = -1;
    } else if (y > py) {
      multiplierY = 1;
    } else {
      // Y value is unchanged
      multiplierY = 0;
    }

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
