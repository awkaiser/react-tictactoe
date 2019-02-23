import TicTacToe from './tictactoe';

import * as actions from './actions';

export const game = new TicTacToe();

export const ticTacToeAppInit = game.state();

export function ticTacToeApp(state, action) {
  switch (action.type) {
    case actions.MAKE_MOVE:
      if (state.hasWon || state.board[action.x][action.y] !== 0) {
        return state;
      }

      return game.move(action.x, action.y);
    case actions.RESET_GAME:
      return game.reset();
    default:
      return state;
  }
}
