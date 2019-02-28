import TicTacToe from './tictactoe';

import { MAKE_MOVE, RESET_GAME } from './actions';

export const game = new TicTacToe();

export const TTTInit = { board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], winner: 0 };

const transformGameState = ({ board, winner }) => ({ board, winner });

export function ticTacToeApp(state, { type, x, y }) {
  switch (type) {
    case MAKE_MOVE:
      return transformGameState(game.move(x, y));

    case RESET_GAME:
      return transformGameState(game.reset());

    default:
      return state;
  }
}
