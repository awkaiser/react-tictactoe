import TicTacToe from './tictactoe';
import type { GameState } from './tictactoe';

import { MAKE_MOVE, RESET_GAME } from './actions';

export const game = new TicTacToe();

export const tttInitState: GameState = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  nextPlayer: 1,
  winner: 0,
};

const tttUpdate = ({ board, nextPlayer, winner }: GameState) => ({
  board,
  nextPlayer,
  winner,
});

export function tttReducer(
  state: GameState,
  { type, x, y }: { type: string; x: number; y: number },
) {
  switch (type) {
    case MAKE_MOVE:
      return tttUpdate(game.move(x, y));

    case RESET_GAME:
      return tttUpdate(game.reset());

    default:
      return state;
  }
}
