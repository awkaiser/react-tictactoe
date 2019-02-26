/**
 * Undefeatable TicTacToe
 *
 * Assumptions:
 * - Player 1 is human, player 2 is computer
 * - Player 1 always goes first
 * - Player 2 must always win or draw the game
 */

import TTTComPlay from './tttcomplay';

const WINNING_COMBOS = [
  [[0, 0], [0, 1], [0, 2]], // Left side
  [[0, 0], [1, 0], [2, 0]], // Top side
  [[2, 0], [2, 1], [2, 2]], // Right side
  [[0, 2], [1, 2], [2, 2]], // Bottom side
  [[1, 0], [1, 1], [1, 2]], // Middle vertical
  [[0, 1], [1, 1], [2, 1]], // Middle horizontal
  [[0, 0], [1, 1], [2, 2]], // First diagonal
  [[0, 2], [1, 1], [2, 0]] // Second diagonal
];

function isWinningCombo(a, b, c) {
  const combo = [this[a[0]][a[1]], this[b[0]][b[1]], this[c[0]][c[1]]];
  const player = combo[0];

  return player && combo.every(value => value === player) ? player : 0;
}

function getWinner(game) {
  const { board } = game.state;
  const openSpaces = game.openSpaces;

  if (openSpaces.length > 4) return 0; // Game cannot be won until the 5th move

  let combosRemaining = WINNING_COMBOS.length;

  let winner = 0;

  do {
    winner = isWinningCombo.apply(board, WINNING_COMBOS[combosRemaining - 1]);

    combosRemaining--;
  } while (!winner && combosRemaining > 0);

  // -1 for draw, 0 for no win, 1 or 2 for winning player
  return !winner && openSpaces.length === 0 ? -1 : winner;
}

// Class for public API of Tic Tac Toe game
export default class TicTacToe {
  constructor(state) {
    this.reset(state);
  }

  get openSpaces() {
    const { board } = this.state;
    const spaces = [];

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (!board[x][y]) spaces.push([x, y]); // Empty spaces will be `0` (falsey)
      }
    }

    return spaces;
  }

  get state() {
    return this._state;
  }

  reset(state) {
    this._state = {
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      nextPlayer: 1,
      winner: 0,
      ...state
    };

    if (state) this._state.winner = getWinner(this);

    return this.state;
  }

  move(x, y) {
    const state = this.state;

    // Return early on invalid move
    if (
      x === undefined ||
      y === undefined ||
      state.winner !== 0 ||
      state.board[x][y]
    ) {
      return state;
    }

    // Set chosen space to "next player" ID
    state.board[x][y] = state.nextPlayer;

    // Winning move?
    state.winner = getWinner(this);

    // Next turn!
    if (state.winner === 0) {
      if (state.nextPlayer === 1) {
        state.nextPlayer = 2;

        return this.move.apply(this, TTTComPlay(this));
      } else {
        state.nextPlayer = 1;
      }
    }

    return this.state;
  }

  cloneWithMove(x, y) {
    const { board, nextPlayer } = this.state;

    if (board[x][y]) return this;

    // Moves as cloned state is useful for considering future moves + unit tests
    const clonedBoard = board.map(column => column.slice());

    clonedBoard[x][y] = nextPlayer;

    return new TicTacToe({
      board: clonedBoard,
      nextPlayer: nextPlayer === 1 ? 2 : 1
    });
  }
}
