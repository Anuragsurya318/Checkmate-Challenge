export default class Referee {
  tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team) {
    return (
      !this.tileIsOccupied(x, y, boardState) ||
      this.tileIsOccupiedByOpponent(x, y, boardState, team)
    );
  }

  tileIsOccupied(x, y, boardState) {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    return piece ? true : false;
  }

  tileIsOccupiedByOpponent(x, y, boardState, team) {
    const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);
    return piece ? true : false;
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

  pawnMove(px, py, x, y, team, boardState) {
    const specialRow = team === "OUR" ? 1 : 6;
    const pawnDirection = team === "OUR" ? 1 : -1;

    // Movement logic
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
    // Attack logic
    else if (x - px === -1 && y - py === pawnDirection) {
      // Attack in upper or bottom left corner
      if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
        return true;
      }
    } else if (x - px === 1 && y - py === pawnDirection) {
      // Attack in the upper or bottom right corner
      if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
        return true;
      }
    }
    return false;
  }

  knightMove(px, py, x, y, team, boardState) {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        // Top and bottom side movement
        if (y - py === 2 * i) {
          if (x - px === j) {
            if (this.tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team)) {
              return true;
            }
          }
        }
        // Right and left side movement
        if (x - px === 2 * i) {
          if (y - py === j) {
            if (this.tileIsEmptyOrOccupiedByOpponent(x, y, boardState, team)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  bishopMove(px, py, x, y, team, boardState) {
    for (let i = 1; i < 8; i++) {
      // Up right movement
      if (x > px && y > py) {
        let passedX = px + i;
        let passedY = py + i;
        // Check if the tile is the destination tile
        if (passedX === x && passedY === y) {
          // Dealing with destination tile
          if (this.tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
            return true;
          }
          break;
        } else {
          // Dealing with passing tile
          if (this.tileIsOccupied(passedX, passedY, boardState)) {
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
          if (this.tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
            return true;
          }
          break;
        } else {
          if (this.tileIsOccupied(passedX, passedY, boardState)) {
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
          if (this.tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
            return true;
          }
          break;
        } else {
          if (this.tileIsOccupied(passedX, passedY, boardState)) {
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
          if (this.tileIsEmptyOrOccupiedByOpponent(passedX, passedY, boardState, team)) {
            return true;
          }
          break;
        } else {
          if (this.tileIsOccupied(passedX, passedY, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }

  rookMove(px, py, x, y, team, boardState) {
    if (px === x) {
      console.log("Moving vertically!");
      for (let i = 1; i < 8; i++) {
        let multiplier = y < py ? -1 : 1;
        let passedY = py + i * multiplier;
        if (px === x && passedY === y) {
          if (this.tileIsEmptyOrOccupiedByOpponent(x, passedY, boardState, team)) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(x, passedY, boardState)) {
            break;
          }
        }
      }
    }
    if (py === y) {
      console.log("Moving horizontally!");
      for (let i = 1; i < 8; i++) {
        let multiplier = x < px ? -1 : 1;
        let passedX = px + i * multiplier;
        if (passedX === x && py === y) {
          if (this.tileIsEmptyOrOccupiedByOpponent(passedX, y, boardState, team)) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(passedX, y, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }

  isValidMove(px, py, x, y, type, team, boardState) {
    let validMove = false;
    switch (type) {
      case "PAWN":
        validMove = this.pawnMove(px, py, x, y, team, boardState);
        break;
      case "KNIGHT":
        validMove = this.knightMove(px, py, x, y, team, boardState);
        break;
      case "BISHOP":
        validMove = this.bishopMove(px, py, x, y, team, boardState);
        break;
      case "ROOK":
        validMove = this.rookMove(px, py, x, y, team, boardState);
        break;
    }
    return validMove;
  }
}
