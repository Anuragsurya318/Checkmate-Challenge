import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

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

export const getPossibleQueenMoves = (queen, boardState) => {
  const possibleMoves = [];

  // Top movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.x, y: queen.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.x, y: queen.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.x - i, y: queen.y };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.x + i, y: queen.y };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Upper right movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.x + i, y: queen.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom right movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.x + i, y: queen.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom left movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.x - i, y: queen.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Top left movement
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.x - i, y: queen.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
