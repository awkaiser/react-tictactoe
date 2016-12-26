import * as actions from './actions'

export const game = new TicTacToe()

const initialState = game.state()

import { TicTacToe } from './tictactoe'

export function ticTacToeApp (state = initialState, action) {
  switch (action.type) {
    case actions.START_MOVE:
      if (state.hasWon || state.board[action.x][action.y] !== 0) {
        return state
      }

      return game.cloneWithMove(action.x, action.y).state()
    case actions.FINISH_MOVE:
      return action.state
    case actions.RESET_GAME:
      return game.reset()
    default:
      return state
  }
}
