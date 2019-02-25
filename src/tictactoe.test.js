import TicTacToe from './tictactoe';

it('recognizes winning conditions', () => {
  // Left side
  const leftSide = new TicTacToe({
    board: [[1, 1, 1], [2, 2, 0], [0, 0, 0]],
    openSpaces: 4
  });

  expect(leftSide.hasWon()).toEqual(1);

  // Top side
  const topSide = new TicTacToe({
    board: [[1, 2, 0], [1, 2, 0], [1, 0, 0]],
    openSpaces: 4
  });

  expect(topSide.hasWon()).toEqual(1);

  // Right side
  const rightSide = new TicTacToe({
    board: [[0, 0, 0], [1, 1, 0], [2, 2, 2]],
    openSpaces: 4
  });

  expect(rightSide.hasWon()).toEqual(2);

  // Bottom side
  const bottomSide = new TicTacToe({
    board: [[0, 1, 2], [0, 1, 2], [0, 0, 2]],
    openSpaces: 4
  });

  expect(bottomSide.hasWon()).toEqual(2);

  // Diagonals
  const diagonalA = new TicTacToe({
    board: [[2, 0, 1], [0, 1, 0], [1, 0, 2]],
    openSpaces: 4
  });

  expect(diagonalA.hasWon()).toEqual(1);

  const diagonalB = new TicTacToe({
    board: [[2, 0, 1], [0, 2, 0], [1, 0, 2]],
    openSpaces: 4
  });

  expect(diagonalB.hasWon()).toEqual(2);

  // Mixed conditions
  const mix1 = new TicTacToe({
    board: [[1, 2, 1], [1, 2, 0], [1, 0, 2]],
    openSpaces: 2
  });

  expect(mix1.hasWon()).toEqual(1);

  const mix2 = new TicTacToe({
    board: [[1, 1, 1], [1, 2, 2], [2, 2, 1]],
    openSpaces: 0
  });

  expect(mix2.hasWon()).toEqual(1);
});

it('recognizes non-winning conditions', () => {
  const noWin1 = new TicTacToe({
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  });

  expect(noWin1.hasWon()).toEqual(0);

  const noWin2 = new TicTacToe({
    board: [[0, 0, 2], [2, 1, 1], [0, 0, 0]]
  });

  expect(noWin2.hasWon()).toEqual(0);

  const noWin3 = new TicTacToe({
    board: [[2, 1, 2], [1, 1, 2], [1, 2, 1]]
  });

  expect(noWin3.hasWon()).toEqual(0);

  const noWin4 = new TicTacToe({
    board: [[1, 2, 2], [2, 1, 1], [1, 1, 2]]
  });

  expect(noWin4.hasWon()).toEqual(0);
});

it('recognizes state changes', () => {
  const game1 = new TicTacToe();
  const game2 = game1.cloneWithMove(0, 0);
  const game3 = game2.cloneWithMove(1, 1);

  game2.move(2, 2);

  const game1State = game1.state;
  const game2State = game2.state;
  const game3State = game3.state;

  expect(game1State.board[0][0]).toEqual(0);

  expect(game2State.board[0][0]).toEqual(1);
  expect(game2State.board[1][1]).toEqual(0);
  expect(game2State.board[2][2]).toEqual(2);

  expect(game3State.board[0][0]).toEqual(1);
  expect(game3State.board[1][1]).toEqual(2);
  expect(game3State.board[2][2]).toEqual(0);
});

test('players can draw game', () => {
  let game = new TicTacToe();

  /**
   * X O X
   * O X X
   * O X O
   */

  game = game.cloneWithMove(1, 1); // X
  game = game.cloneWithMove(2, 2); // O
  game = game.cloneWithMove(0, 0); // X
  game = game.cloneWithMove(0, 2); // O
  game = game.cloneWithMove(2, 1); // X
  game = game.cloneWithMove(0, 1); // O
  game = game.cloneWithMove(1, 2); // X
  game = game.cloneWithMove(1, 0); // O
  game = game.cloneWithMove(2, 0); // X (draw)

  const state = game.state;

  expect(state.openSpaces).toEqual(0);
  expect(state.hasWon).toEqual(-1);
});

it('recognizes a player 1 win', () => {
  let game = new TicTacToe();

  /**
   * O X O
   * O X -
   * X X -
   */

  game = game.cloneWithMove(1, 1); // X
  game = game.cloneWithMove(0, 0); // O
  game = game.cloneWithMove(0, 2); // X
  game = game.cloneWithMove(2, 0); // O
  game = game.cloneWithMove(1, 0); // X
  game = game.cloneWithMove(0, 1); // O
  game = game.cloneWithMove(1, 2); // X (winner)

  const state = game.state;

  expect(state.openSpaces).toEqual(2);
  expect(state.hasWon).toEqual(1);
});

it('recognizes a player 2 win', () => {
  let game = new TicTacToe();

  /**
   * O - X
   * O X -
   * O - X
   */

  game = game.cloneWithMove(2, 0); // X
  game = game.cloneWithMove(0, 0); // O
  game = game.cloneWithMove(1, 1); // X
  game = game.cloneWithMove(0, 2); // O
  game = game.cloneWithMove(2, 2); // X
  game = game.cloneWithMove(0, 1); // O (winner)

  const state = game.state;

  expect(state.openSpaces).toEqual(3);
  expect(state.hasWon).toEqual(2);
});
