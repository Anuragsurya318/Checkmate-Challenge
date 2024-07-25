import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

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

export const getPossibleBishopMoves = (bishop, boardState) => {
  const possibleMoves = [];

  // Upper right movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: bishop.x + i, y: bishop.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom right movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: bishop.x + i, y: bishop.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom left movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: bishop.x - i, y: bishop.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Top left movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: bishop.x - i, y: bishop.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
