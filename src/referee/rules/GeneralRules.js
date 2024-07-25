export const tileIsOccupied = (x, y, boardState) => {
  const piece = boardState.find((p) => p.x === x && p.y === y);
  return piece ? true : false;
};

export const tileIsOccupiedByOpponent = (x, y, boardState, team) => {
  const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);
  return piece ? true : false;
};

export const tileIsEmptyOrOccupiedByOpponent = (x, y, boardState, team) => {
  return !tileIsOccupied(x, y, boardState) || tileIsOccupiedByOpponent(x, y, boardState, team);
};
