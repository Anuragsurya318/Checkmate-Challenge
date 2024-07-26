import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

export const kingMove = (px, py, x, y, team, boardState) => {
  const dx = Math.abs(px - x);
  const dy = Math.abs(py - y);

  // Normal king move
  if (dx <= 1 && dy <= 1) {
    return tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team);
  }

  // Castling move
  if (dy === 0 && dx === 2) {
    const rookX = x > px ? 7 : 0; // Rook position depending on king side or queen side castling
    const rook = boardState.find(
      (p) => p.x === rookX && p.y === py && p.type === "ROOK" && p.team === team
    );

    if (!rook || rook.hasMoved || hasKingMoved(boardState, team)) {
      return false;
    }

    const direction = x > px ? 1 : -1;
    for (let i = 1; i <= 2; i++) {
      if (tileIsOccupied(px + i * direction, py, boardState)) {
        return false;
      }
    }

    if (isKingInCheckAfterCastling(px, py, x, y, team, boardState)) {
      return false;
    }

    return true;
  }

  return false;
};

const isKingInDanger = (team, boardState) => {
  const king = boardState.find((p) => p.type === "KING" && p.team === team);

  if (!king) return false;

  // Get all opponent pieces
  const opponentTeam = team === "WHITE" ? "BLACK" : "WHITE";
  const opponentPieces = boardState.filter((p) => p.team === opponentTeam);

  // Check if any opponent piece can move to the king's position
  return opponentPieces.some((piece) => {
    const validMoves = getValidMovesForPiece(piece, boardState);
    return validMoves.some((move) => move.x === king.x && move.y === king.y);
  });
};

const hasKingMoved = (boardState, team) => {
  const king = boardState.find((p) => p.type === "KING" && p.team === team);
  return king.hasMoved;
};

const isKingInCheckAfterCastling = (px, py, x, y, team, boardState) => {
  const hypotheticalBoard = boardState.map((p) =>
    p.type === "KING" && p.team === team ? { ...p, x, y } : p
  );

  return isKingInDanger(team, hypotheticalBoard);
};

export const getPossibleKingMoves = (king, boardState) => {
  const possibleMoves = [];

  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ];

  directions.forEach((dir) => {
    const destination = { x: king.x + dir.x, y: king.y + dir.y };
    if (tileIsEmptyOrOccupiedByOpponent(destination.x, destination.y, boardState, king.team)) {
      possibleMoves.push(destination);
    }
  });

  // Castling moves
  if (!king.hasMoved) {
    // King-side castling
    if (
      !tileIsOccupied(king.x + 1, king.y, boardState) &&
      !tileIsOccupied(king.x + 2, king.y, boardState)
    ) {
      possibleMoves.push({ x: king.x + 2, y: king.y });
    }
    // Queen-side castling
    if (
      !tileIsOccupied(king.x - 1, king.y, boardState) &&
      !tileIsOccupied(king.x - 2, king.y, boardState) &&
      !tileIsOccupied(king.x - 3, king.y, boardState)
    ) {
      possibleMoves.push({ x: king.x - 2, y: king.y });
    }
  }

  return possibleMoves;
};
