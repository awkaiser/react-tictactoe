/**
 * Undefeatable TicTacToe
 *
 * Assumptions:
 * - Player 1 is human, player 2 is computer
 * - Player 1 always goes first
 * - Player 2 must always win or draw the game
 */

import TTTComPlay from './tttcomplay';

// Class for public API of Tic Tac Toe game
export default class TicTacToe {
  constructor(state = {}) {
    this.reset(state);
  }

  reset(state = {}) {
    // Multi-dimensional array for simple 3x3 board by x/y coords
    this._board = state.board || [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    // Default: 9 open spaces
    this._openSpaces = state.openSpaces < 9 ? state.openSpaces : 9;

    // Default: Player 1 (human) goes first
    this._nextPlayer = state.nextPlayer || 1;

    // Update and return state
    return this.state();
  }

  move(x, y) {
    const board = this._board;
    const state = this.state();

    let openSpaces = state.openSpaces;

    // Return early on invalid move
    if (
      x === undefined ||
      y === undefined ||
      state.hasWon ||
      state.hasDrawn ||
      board[x][y]
    ) {
      return state;
    }

    // Set chosen space to "next player" ID
    board[x][y] = state.nextPlayer;

    // Decrement counter of available open spaces
    openSpaces -= 1;

    // Store updated open spaces value prior to performing computer move
    this._openSpaces = openSpaces;

    // Next turn!
    if (state.nextPlayer === 1) {
      this._nextPlayer = 2;

      if (openSpaces) {
        let idealMove;

        if (openSpaces === 8) {
          // Reduce minimax search space by playing center or corner first
          idealMove = TTTComPlay.openingMove(this);
        } else {
          // Perform computer's ideal move
          idealMove = TTTComPlay.idealMove(this);
        }

        this.move.apply(this, idealMove);
      }
    } else {
      this._nextPlayer = 1;
    }

    return this.state();
  }

  state() {
    // Check remaining open spaces
    const openSpaces = this._openSpaces;

    // Don't recompute state if nothing has changed
    if (this._state && this._state.openSpaces === openSpaces) {
      return this._state;
    }

    // Check if we've reached a winning game state (1 = Player 1 won, 2 = Player 2 won)
    const hasWon = this.hasWon();

    // Store and return representation of current game state
    this._state = {
      board: this._board,
      hasDrawn: !hasWon && this._openSpaces === 0,
      hasWon,
      nextPlayer: this._nextPlayer,
      openSpaces: this._openSpaces
    };

    return this._state;
  }

  cloneWithMove(x, y) {
    if (this._board[x][y]) return this;

    // Moves as cloned state is useful for considering future moves + unit tests
    const board = this._board.map(column => column.slice());

    board[x][y] = this._nextPlayer;

    return new TicTacToe({
      board,
      nextPlayer: this._nextPlayer === 1 ? 2 : 1,
      openSpaces: this._openSpaces - 1
    });
  }

  hasWon() {
    // Game cannot be won until the 5th move
    if (this._openSpaces > 4) return 0;

    const board = this._board;

    const winningCombos = [
      [[0, 0], [0, 1], [0, 2]], // Left side
      [[0, 0], [1, 0], [2, 0]], // Top side
      [[2, 0], [2, 1], [2, 2]], // Right side
      [[0, 2], [1, 2], [2, 2]], // Bottom side
      [[1, 0], [1, 1], [1, 2]], // Middle vertical
      [[0, 1], [1, 1], [2, 1]], // Middle horizontal
      [[0, 0], [1, 1], [2, 2]], // First diagonal
      [[0, 2], [1, 1], [2, 0]] // Second diagonal
    ];

    let combosRemaining = winningCombos.length;

    let winner;

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
      winner = playerIsWinning.apply(this, winningCombos[combosRemaining - 1]);

      combosRemaining--;
    } while (!winner && combosRemaining !== 0);

    return winner; // 1 or 2 for winning player, 0 for no win
  }
}
