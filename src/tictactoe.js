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

// Class for public API of Tic Tac Toe game
export default class TicTacToe {
  constructor(state) {
    this.reset(state);
  }

  reset(state) {
    this._state = {
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      hasWon: 0,
      nextPlayer: 1,
      openSpaces: 9,
      ...state
    };

    if (state) this._state.hasWon = this.hasWon();

    return this.state;
  }

  move(x, y) {
    const state = this.state;

    // Return early on invalid move
    if (
      x === undefined ||
      y === undefined ||
      state.hasWon !== 0 ||
      state.board[x][y]
    ) {
      return state;
    }

    // Set chosen space to "next player" ID
    state.board[x][y] = state.nextPlayer;

    // Decrement counter of available open spaces
    state.openSpaces -= 1;

    // Winning move?
    state.hasWon = this.hasWon();

    // Next turn!
    if (state.openSpaces) {
      if (state.nextPlayer === 1) {
        state.nextPlayer = 2;

        return this.move.apply(this, TTTComPlay.idealMove(this));
      } else {
        state.nextPlayer = 1;
      }
    }

    return this.state;
  }

  get state() {
    return this._state;
  }

  cloneWithMove(x, y) {
    const { board, nextPlayer, openSpaces } = this.state;

    if (board[x][y]) return this;

    // Moves as cloned state is useful for considering future moves + unit tests
    const clonedBoard = board.map(column => column.slice());

    clonedBoard[x][y] = nextPlayer;

    return new TicTacToe({
      board: clonedBoard,
      nextPlayer: nextPlayer === 1 ? 2 : 1,
      openSpaces: openSpaces - 1
    });
  }

  hasWon() {
    const { board, openSpaces } = this.state;

    if (openSpaces > 4) return 0; // Game cannot be won until the 5th move

    let combosRemaining = WINNING_COMBOS.length;

    let winner = 0;

    function playerIsWinning(first, second, third) {
      const combo = [
        board[first[0]][first[1]],
        board[second[0]][second[1]],
        board[third[0]][third[1]]
      ];

      const player = combo[0];

      return player && combo.every(value => value === player) ? player : 0;
    }

    do {
      winner = playerIsWinning.apply(this, WINNING_COMBOS[combosRemaining - 1]);

      combosRemaining--;
    } while (!winner && combosRemaining > 0);

    // -1 for draw, 0 for no win, 1 or 2 for winning player
    return !winner && openSpaces === 0 ? -1 : winner;
  }
}
