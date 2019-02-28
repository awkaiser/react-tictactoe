// Action types

export const MAKE_MOVE = 'MAKE_MOVE';
export const RESET_GAME = 'RESET_GAME';

// Action creators

export const makeMove = (x, y) => ({ type: MAKE_MOVE, x, y });

export const resetGame = () => ({ type: RESET_GAME });
