import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

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

export const getPossibleKingMoves = (king, boardState) => {
  const possibleMoves = [];

  // Top movement
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.x, y: king.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.x, y: king.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.x - i, y: king.y };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.x + i, y: king.y };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Upper right movement
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.x + i, y: king.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom right movement
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.x + i, y: king.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom left movement
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.x - i, y: king.y - i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Top left movement
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.x - i, y: king.y + i };

    if (!tileIsOccupied(destination.x, destination.y, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
