// Action types

export const MAKE_MOVE = 'MAKE_MOVE';
export const RESET_GAME = 'RESET_GAME';

// Action creators

export function makeMove(x, y) {
  return {
    type: MAKE_MOVE,
    x,
    y
  };
}

export function resetGame() {
  return {
    type: RESET_GAME
  };
}
