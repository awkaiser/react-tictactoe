/**
 * Undefeatable TicTacToe
 *
 * Assumptions:
 * - Player 1 is human, player 2 is computer
 * - Player 1 always goes first
 * - Player 2 must always win or draw the game
 */

const WINNING_COMBOS = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ], // Left side
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ], // Top side
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ], // Right side
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ], // Bottom side
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ], // Middle vertical
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ], // Middle horizontal
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ], // First diagonal
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ], // Second diagonal
];

function hasWon([x1, y1], [x2, y2], [x3, y3]) {
  const player = this[x1][y1];

  return this[x2][y2] === player && this[x3][y3] === player ? player : 0;
}

function getWinner(game) {
  const openSpaces = game.openSpaces;

  if (openSpaces.length > 4) return 0; // Game cannot be won until the 5th move

  let combosLeft = WINNING_COMBOS.length;

  let winner = 0;

  do {
    winner = hasWon.apply(game.board, WINNING_COMBOS[combosLeft - 1]);

    combosLeft--;
  } while (!winner && combosLeft > 0);

  // -1 for draw, 0 for no win, 1 or 2 for winning player
  return !winner && openSpaces.length === 0 ? -1 : winner;
}

const validMove = (x, y) => x >= 0 && x < 3 && y >= 0 && y < 3;

// Class for public API of Tic Tac Toe game
export default class TicTacToe {
  #state;

  constructor(state) {
    this.reset(state);
  }

  get board() {
    return this.#state.board;
  }

  get nextPlayer() {
    return this.#state.nextPlayer;
  }

  get openSpaces() {
    const spaces = [];

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (!this.board[x][y]) spaces.push([x, y]); // Empty spaces will be `0` (falsey)
      }
    }

    return spaces;
  }

  get winner() {
    return this.#state.winner;
  }

  reset(state) {
    this.#state = {
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      nextPlayer: 1,
      winner: 0,
      ...state,
    };

    if (state) this.#state.winner = getWinner(this);

    return this.#state;
  }

  move(x, y) {
    const state = this.#state;

    // Return early on invalid move
    if (!validMove(x, y) || this.winner !== 0 || this.board[x][y]) return state;

    // Set chosen space to "next player" ID
    state.board[x][y] = state.nextPlayer;

    // Winning move?
    state.winner = getWinner(this);

    // Next turn!
    state.nextPlayer = state.nextPlayer === 1 ? 2 : 1;

    return state;
  }

  cloneMove(x, y) {
    if (!validMove(x, y) || this.winner !== 0 || this.board[x][y]) return this;

    const board = this.board.map((column) => column.slice());

    board[x][y] = this.nextPlayer;

    return new TicTacToe({ board, nextPlayer: this.nextPlayer === 1 ? 2 : 1 });
  }
}
