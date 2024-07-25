import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

export const rookMove = (px, py, x, y, team, boardState) => {
  if (px === x) {
    for (let i = 1; i < 8; i++) {
      let multiplier = y < py ? -1 : 1;
      let passedY = py + i * multiplier;
      if (px === x && passedY === y) {
        if (tileIsEmptyOrOccupiedByOpponent(x, passedY, boardState, team)) {
          return true;
        }
      } else {
        if (tileIsOccupied(x, passedY, boardState)) {
          break;
        }
      }
    }
  }
  if (py === y) {
    for (let i = 1; i < 8; i++) {
      let multiplier = x < px ? -1 : 1;
      let passedX = px + i * multiplier;
      if (passedX === x && py === y) {
        if (tileIsEmptyOrOccupiedByOpponent(passedX, y, boardState, team)) {
          return true;
        }
      } else {
        if (tileIsOccupied(passedX, y, boardState)) {
          break;
        }
      }
    }
  }
  return false;
};

export const getPossibleRookMoves = (rook, boardState) => {
  const possibleMoves = [];

  // Top movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: rook.x, y: rook.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: rook.x, y: rook.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: rook.x - i, y: rook.y };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: rook.x + i, y: rook.y };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
