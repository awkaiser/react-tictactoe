import * as actions from './actions'

const game = new TicTacToe()

const initialState = game.state()

import { TicTacToe } from './tictactoe'

export function ticTacToeApp (state = initialState, action) {
  switch (action.type) {
    case actions.MAKE_MOVE:
      return game.move(action.x, action.y)
    case actions.RESET_GAME:
      return game.reset()
    default:
      return state
  }
}
