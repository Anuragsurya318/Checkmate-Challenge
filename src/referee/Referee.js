export default class Referee {
  tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team) {
    return (
      !this.tileIsOccupied(x, y, boardState) ||
      this.TileIsOccupiedByOpponent(x, y, boardState, team)
    );
  }

  tileIsOccupied(x, y, boardState) {
    const piece = boardState.find((p) => p.x === x && p.y === y);

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  TileIsOccupiedByOpponent(x, y, boardState, team) {
    const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassantMove(px, py, x, y, type, team, boardState) {
    const pawnDirection = team === "OUR" ? 1 : -1;

    if (type === "PAWN") {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find((p) => p.x === x && p.y === y - pawnDirection && p.enPassant);
        if (piece) {
          return true;
        }
      }
    }
    return false;
  }

  isValidMove(px, py, x, y, type, team, boardState) {
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

      //ATTACK LOGIC
      else if (x - px === -1 && y - py === pawnDirection) {
        //ATTACK IN UPPER OR BOTTOM LEFT CORNER
        console.log("upper / bottom left");
        if (this.TileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        //ATTACK IN THE UPPER OR BOTTOM RIGHT CORNER
        console.log("upper / bottom right");
        if (this.TileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      }
    } else if (type === "KNIGHT") {
      for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
          // TOP AND BOTTOM SIDE MOVEMENT
          if (y - py === 2 * i) {
            if (x - px === j) {
              if (this.tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team)) {
                return true;
              }
            }
          }

          // RIGHT AND LEFT SIDE MOVEMENT
          if (x - px === 2 * i) {
            if (y - py === j) {
              if (this.tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team)) {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }
}

// console.log("Referee is checking the move...");
// console.log(`Previous location: (${px},${py})`);
// console.log(`Current location: (${x},${y})`);
// console.log(`Piece type: ${type}`);
// console.log(`Team: ${team}`);
