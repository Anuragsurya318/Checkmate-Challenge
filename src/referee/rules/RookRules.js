import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

export const rookMove = (px, py, x, y, team, boardState) => {
  if (px === x) {
    for (let i = Math.min(py, y) + 1; i < Math.max(py, y); i++) {
      if (tileIsOccupied(px, i, boardState)) {
        return false;
      }
    }
  } else if (py === y) {
    for (let i = Math.min(px, x) + 1; i < Math.max(px, x); i++) {
      if (tileIsOccupied(i, py, boardState)) {
        return false;
      }
    }
  } else {
    return false;
  }

  return tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team);
};

export const getPossibleRookMoves = (rook, boardState) => {
  const possibleMoves = [];

  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  directions.forEach((dir) => {
    let x = rook.x + dir.x;
    let y = rook.y + dir.y;

    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      if (!tileIsOccupied(x, y, boardState)) {
        possibleMoves.push({ x, y });
      } else if (tileIsOccupiedByOpponent(x, y, boardState, rook.team)) {
        possibleMoves.push({ x, y });
        break;
      } else {
        break;
      }

      x += dir.x;
      y += dir.y;
    }
  });

  return possibleMoves;
};
