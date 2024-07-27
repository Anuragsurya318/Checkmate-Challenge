import { PieceType, TeamType } from "../../Constants";
import { bishopMove } from "./BishopRules";
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";
import { kingMove } from "./KingRules";
import { knightMove } from "./KnightRules";
import { pawnMove } from "./PawnRules";
import { queenMove } from "./QueenRules";
import { rookMove } from "./RookRules";

export const getValidMovesForPiece = (piece, boardState) => {
  const { type, x, y, team } = piece;

  switch (type) {
    case PieceType.ROOK:
      return rookMove(x, y, team, boardState);

    case PieceType.BISHOP:
      return bishopMove(x, y, team, boardState);

    case PieceType.QUEEN:
      return queenMove(x, y, team, boardState);

    case PieceType.KNIGHT:
      return knightMove(x, y, team, boardState);

    case PieceType.KING:
      return kingMove(x, y, team, boardState);

    case PieceType.PAWN:
      return pawnMove(x, y, team, boardState);

    default:
      return [];
  }
};
