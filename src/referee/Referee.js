export default class Referee {
  tileIsOccupied(x, y, boardState) {
    console.log("Checking if tile is occupied...");

    const piece = boardState.find((p) => p.x === x && p.y === y);

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove(px, py, x, y, type, team, boardState) {
    console.log("Referee is checking the move...");
    console.log(`Previous location: (${px},${py})`);
    console.log(`Current location: (${x},${y})`);
    console.log(`Piece type: ${type}`);
    console.log(`Team: ${team}`);

    if (type === "PAWN") {
      const specialRow = team === "OUR" ? 1 : 6;
      const pawnDirection = team === "OUR" ? 1 : -1;

      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }
    }

    return false;
  }
}
