import { bb, bk, bn, bp, bq, br, wb, wk, wn, wp, wq, wr } from "./assets";

export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 68.75;

export const PieceType = {
  PAWN: "PAWN",
  BISHOP: "BISHOP",
  KNIGHT: "KNIGHT",
  ROOK: "ROOK",
  QUEEN: "QUEEN",
  KING: "KING",
};

export const TeamType = {
  OPPONENT: "OPPONENT",
  OUR: "OUR",
};

// MessageTypes.js or within ChessBoard.jsx
export const MESSAGES = {
  CHECKMATE: "Checkmate! Game over.",
  STALEMATE: "Stalemate! The game is a draw.",
  CHECK: "Your king is in check!",
  MOVE: "Move successful.",
  INVALID_MOVE: "Invalid move. Please try again.",
};

export const initialBoardState = [
  {
    image: br,
    x: 0,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: bn,
    x: 1,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: bb,
    x: 2,
    y: 7,
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: bq,
    x: 3,
    y: 7,
    type: PieceType.QUEEN,
    team: TeamType.OPPONENT,
  },
  {
    image: bk,
    x: 4,
    y: 7,
    type: PieceType.KING,
    team: TeamType.OPPONENT,
  },
  {
    image: bb,
    x: 5,
    y: 7,
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: bn,
    x: 6,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: br,
    x: 7,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: bp,
    x: 0,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: bp,
    x: 1,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: bp,
    x: 2,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: bp,
    x: 3,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: bp,
    x: 4,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: bp,
    x: 5,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: bp,
    x: 6,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: bp,
    x: 7,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },

  {
    image: wr,
    x: 0,
    y: 0,
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: wn,
    x: 1,
    y: 0,
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: wb,
    x: 2,
    y: 0,
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: wq,
    x: 3,
    y: 0,
    type: PieceType.QUEEN,
    team: TeamType.OUR,
  },
  {
    image: wk,
    x: 4,
    y: 0,
    type: PieceType.KING,
    team: TeamType.OUR,
  },
  {
    image: wb,
    x: 5,
    y: 0,
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: wn,
    x: 6,
    y: 0,
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: wr,
    x: 7,
    y: 0,
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: wp,
    x: 0,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: wp,
    x: 1,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: wp,
    x: 2,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: wp,
    x: 3,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: wp,
    x: 4,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: wp,
    x: 5,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: wp,
    x: 6,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: wp,
    x: 7,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
];
