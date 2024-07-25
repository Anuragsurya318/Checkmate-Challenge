import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export const bishopMove = (px, py, x, y, team, boardState) => {
  for (let i = 1; i < 8; i++) {
    // Up right movement
    if (x > px && y > py) {
      let passedX = px + i;
      let passedY = py + i;
      // Check if the tile is the destination tile
      if (passedX === x && passedY === y) {
        // Dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
          return true;
        }
        break;
      } else {
        // Dealing with passing tile
        if (tileIsOccupied(passedX, passedY, boardState)) {
          break;
        }
      }
    }
    // Bottom right movement
    if (x > px && y < py) {
      let passedX = px + i;
      let passedY = py - i;
      // Check if the tile is the destination tile
      if (passedX === x && passedY === y) {
        // Dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
          return true;
        }
        break;
      } else {
        if (tileIsOccupied(passedX, passedY, boardState)) {
          break;
        }
      }
    }
    // Bottom left movement
    if (x < px && y < py) {
      let passedX = px - i;
      let passedY = py - i;
      // Check if the tile is the destination tile
      if (passedX === x && passedY === y) {
        // Dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
          return true;
        }
        break;
      } else {
        if (tileIsOccupied(passedX, passedY, boardState)) {
          break;
        }
      }
    }
    // Top left movement
    if (x < px && y > py) {
      let passedX = px - i;
      let passedY = py + i;
      // Check if the tile is the destination tile
      if (passedX === x && passedY === y) {
        // Dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
          return true;
        }
        break;
      } else {
        if (tileIsOccupied(passedX, passedY, boardState)) {
          break;
        }
      }
    }
  }
  return false;
};
