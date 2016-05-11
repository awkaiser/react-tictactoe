import { game } from './reducers'

// Action types

export const START_MOVE = 'START_MOVE'
export const MAKE_MOVE = 'MAKE_MOVE'
export const FINISH_MOVE = 'FINISH_MOVE'
export const RESET_GAME = 'RESET_GAME'

// Action creators

export function startMove (x, y) {
  return {
    type: START_MOVE,
    x,
    y
  }
}

export function makeMove (x, y) {
  return function (dispatch, getState) {
    dispatch(startMove(x, y))

    return (new Promise(function (resolve, reject) {
      setTimeout(function () {
        let state = game.move(x, y)

        resolve(state)
      }, 10)
    })).then(state => dispatch(finishMove(state)))
  }
}

export function finishMove (state) {
  return {
    type: FINISH_MOVE,
    state
  }
}

export function resetGame () {
  return {
    type: RESET_GAME
  }
}
