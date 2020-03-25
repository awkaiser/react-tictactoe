import TicTacToe from './tictactoe';

it('recognizes winning conditions', () => {
  /** Left side
   * X O -
   * X O -
   * X - -
   */
  const leftSide = new TicTacToe({
    board: [
      [1, 1, 1],
      [2, 2, 0],
      [0, 0, 0],
    ],
  });

  expect(leftSide.winner).toEqual(1);

  /** Top side
   * X X X
   * O O -
   * - - -
   */
  const topSide = new TicTacToe({
    board: [
      [1, 2, 0],
      [1, 2, 0],
      [1, 0, 0],
    ],
  });

  expect(topSide.winner).toEqual(1);

  /** Right side
   * - X O
   * - X O
   * - - O
   */
  const rightSide = new TicTacToe({
    board: [
      [0, 0, 0],
      [1, 1, 0],
      [2, 2, 2],
    ],
  });

  expect(rightSide.winner).toEqual(2);

  /** Bottom side
   * - - -
   * X X -
   * O O O
   */
  const bottomSide = new TicTacToe({
    board: [
      [0, 1, 2],
      [0, 1, 2],
      [0, 0, 2],
    ],
  });

  expect(bottomSide.winner).toEqual(2);

  /** Diagonal
   * O - X
   * - X -
   * X - O
   */
  const diagonalA = new TicTacToe({
    board: [
      [2, 0, 1],
      [0, 1, 0],
      [1, 0, 2],
    ],
  });

  expect(diagonalA.winner).toEqual(1);

  /** Diagonal
   * O - X
   * - O -
   * X - O
   */
  const diagonalB = new TicTacToe({
    board: [
      [2, 0, 1],
      [0, 2, 0],
      [1, 0, 2],
    ],
  });

  expect(diagonalB.winner).toEqual(2);

  /** Mixed
   * X X X
   * O O -
   * X - O
   */
  const mix1 = new TicTacToe({
    board: [
      [1, 2, 1],
      [1, 2, 0],
      [1, 0, 2],
    ],
  });

  expect(mix1.winner).toEqual(1);

  /** Mixed
   * X X O
   * X O O
   * X O X
   */
  const mix2 = new TicTacToe({
    board: [
      [1, 1, 1],
      [1, 2, 2],
      [2, 2, 1],
    ],
  });

  expect(mix2.winner).toEqual(1);
});

it('recognizes non-winning conditions', () => {
  /**
   * - - -
   * - - -
   * - - -
   */
  const noWin1 = new TicTacToe({
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  });

  expect(noWin1.winner).toEqual(0);

  /**
   * - O -
   * - X -
   * O X -
   */
  const noWin2 = new TicTacToe({
    board: [
      [0, 0, 2],
      [2, 1, 1],
      [0, 0, 0],
    ],
  });

  expect(noWin2.winner).toEqual(0);

  /**
   * O X X
   * X X O
   * O O X
   */
  const noWin3 = new TicTacToe({
    board: [
      [2, 1, 2],
      [1, 1, 2],
      [1, 2, 1],
    ],
  });

  expect(noWin3.winner).toEqual(-1);

  /**
   * X O X
   * O X X
   * O X O
   */
  const noWin4 = new TicTacToe({
    board: [
      [1, 2, 2],
      [2, 1, 1],
      [1, 1, 2],
    ],
  });

  expect(noWin4.winner).toEqual(-1);
});

it('recognizes state changes', () => {
  const game1 = new TicTacToe();
  const game2 = game1.cloneMove(0, 0);
  const game3 = game2.cloneMove(1, 1);
  const game4 = game3.cloneMove(1, 1); // already played (invalid)

  game2.move(2, 2);

  expect(game1.board[0][0]).toEqual(0);
  expect(game1.board[1][1]).toEqual(0);
  expect(game1.board[2][2]).toEqual(0);
  expect(game1.openSpaces.length).toEqual(9);

  expect(game2.board[0][0]).toEqual(1);
  expect(game2.board[1][1]).toEqual(0);
  expect(game2.board[2][2]).toEqual(2);
  expect(game2.openSpaces.length).toEqual(7);

  expect(game3.board[0][0]).toEqual(1);
  expect(game3.board[1][1]).toEqual(2);
  expect(game3.board[2][2]).toEqual(0);
  expect(game3.openSpaces.length).toEqual(7);

  expect(game4.board[0][0]).toEqual(1);
  expect(game4.board[1][1]).toEqual(2);
  expect(game4.board[2][2]).toEqual(0);
  expect(game4.openSpaces.length).toEqual(7);
});

test('players can draw game', () => {
  let game = new TicTacToe();

  /**
   * X O X
   * O X X
   * O X O
   */

  game = game.cloneMove(1, 1); // X
  game = game.cloneMove(2, 2); // O
  game = game.cloneMove(0, 0); // X
  game = game.cloneMove(0, 2); // O
  game = game.cloneMove(2, 1); // X
  game = game.cloneMove(0, 1); // O
  game = game.cloneMove(1, 2); // X
  game = game.cloneMove(1, 0); // O
  game = game.cloneMove(2, 0); // X (draw)

  expect(game.openSpaces.length).toEqual(0);
  expect(game.winner).toEqual(-1);
});

it('recognizes a player 1 win', () => {
  let game = new TicTacToe();

  /**
   * O X O
   * O X -
   * X X -
   */

  game = game.cloneMove(1, 1); // X
  game = game.cloneMove(0, 0); // O
  game = game.cloneMove(0, 2); // X
  game = game.cloneMove(2, 0); // O
  game = game.cloneMove(1, 0); // X
  game = game.cloneMove(0, 1); // O
  game = game.cloneMove(1, 2); // X (winner)

  expect(game.openSpaces.length).toEqual(2);
  expect(game.winner).toEqual(1);
});

it('recognizes a player 2 win', () => {
  let game = new TicTacToe();

  /**
   * O - X
   * O X -
   * O - X
   */

  game = game.cloneMove(2, 0); // X
  game = game.cloneMove(0, 0); // O
  game = game.cloneMove(1, 1); // X
  game = game.cloneMove(0, 2); // O
  game = game.cloneMove(2, 2); // X
  game = game.cloneMove(0, 1); // O (winner)

  expect(game.openSpaces.length).toEqual(3);
  expect(game.winner).toEqual(2);
});

it('is not affected by invalid moves', () => {
  let game = new TicTacToe();

  /**
   * O - X
   * O X -
   * O - X
   */

  game = game.cloneMove(2, 0); // X
  game = game.cloneMove(0, 0); // O
  game = game.cloneMove(1, 1); // X
  game = game.cloneMove(0, 2); // O
  game = game.cloneMove(3, 3); // [invalid]
  game = game.cloneMove(-1, -1); // [invalid]
  game = game.cloneMove(-1, 3); // [invalid]
  game = game.cloneMove(2, 2); // X
  game = game.cloneMove(0, 1); // O (winner)
  game = game.cloneMove(1, 0); // X [game already won]
  game = game.cloneMove(2, 1); // O [game already won]

  expect(game.openSpaces.length).toEqual(3);
  expect(game.winner).toEqual(2);
});
