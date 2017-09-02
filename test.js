import test from 'tape'

import TicTacToe from './src/tictactoe'

test('Tic Tac Toe recognizes winning conditions', (t) => {
  t.plan(8)

  // Left side
  const leftSide = new TicTacToe({
    board: [
      [1, 1, 1],
      [2, 2, 0],
      [0, 0, 0]
    ],
    openSpaces: 4
  })

  t.equal(leftSide.hasWon(), 1)

  // Top side
  const topSide = new TicTacToe({
    board: [
      [1, 2, 0],
      [1, 2, 0],
      [1, 0, 0]
    ],
    openSpaces: 4
  })

  t.equal(topSide.hasWon(), 1)

  // Right side
  const rightSide = new TicTacToe({
    board: [
      [0, 0, 0],
      [1, 1, 0],
      [2, 2, 2]
    ],
    openSpaces: 4
  })

  t.equal(rightSide.hasWon(), 2)

  // Bottom side
  const bottomSide = new TicTacToe({
    board: [
      [0, 1, 2],
      [0, 1, 2],
      [0, 0, 2]
    ],
    openSpaces: 4
  })

  t.equal(bottomSide.hasWon(), 2)

  // Diagonals
  const diagonalA = new TicTacToe({
    board: [
      [2, 0, 1],
      [0, 1, 0],
      [1, 0, 2]
    ],
    openSpaces: 4
  })

  t.equal(diagonalA.hasWon(), 1)

  const diagonalB = new TicTacToe({
    board: [
      [2, 0, 1],
      [0, 2, 0],
      [1, 0, 2]
    ],
    openSpaces: 4
  })

  t.equal(diagonalB.hasWon(), 2)

  // Mixed conditions
  const mix1 = new TicTacToe({
    board: [
      [1, 2, 1],
      [1, 2, 0],
      [1, 0, 2]
    ],
    openSpaces: 2
  })

  t.equal(mix1.hasWon(), 1)

  const mix2 = new TicTacToe({
    board: [
      [1, 1, 1],
      [1, 2, 2],
      [2, 2, 1]
    ],
    openSpaces: 0
  })

  t.equal(mix2.hasWon(), 1)

  t.end()
})

test('Tic Tac Toe recognizes non-winning conditions', (t) => {
  t.plan(4)

  const noWin1 = new TicTacToe({
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  })

  t.equal(noWin1.hasWon(), false)

  const noWin2 = new TicTacToe({
    board: [
      [0, 0, 2],
      [2, 1, 1],
      [0, 0, 0]
    ]
  })

  t.equal(noWin2.hasWon(), false)

  const noWin3 = new TicTacToe({
    board: [
      [2, 1, 2],
      [1, 1, 2],
      [1, 2, 1]
    ]
  })

  t.equal(noWin3.hasWon(), false)

  const noWin4 = new TicTacToe({
    board: [
      [1, 2, 2],
      [2, 1, 1],
      [1, 1, 2]
    ]
  })

  t.equal(noWin4.hasWon(), false)

  t.end()
})

test('Tic Tac Toe recognizes state changes', (t) => {
  t.plan(7)

  const game1 = new TicTacToe()
  const game2 = game1.cloneWithMove(0, 0)
  const game3 = game2.cloneWithMove(1, 1)

  game2.move(2, 2)

  const game1State = game1.state()
  const game2State = game2.state()
  const game3State = game3.state()

  t.equal(game1State.board[0][0], 0)

  t.equal(game2State.board[0][0], 1)
  t.equal(game2State.board[1][1], 0)
  t.equal(game2State.board[2][2], 2)

  t.equal(game3State.board[0][0], 1)
  t.equal(game3State.board[1][1], 2)
  t.equal(game3State.board[2][2], 0)

  t.end()
})

test('Tic Tac Toe players can draw game', (t) => {
  t.plan(3)

  let game = new TicTacToe()

  /**
   * X O X
   * O X X
   * O X O
   */

  game = game.cloneWithMove(1, 1) // X
  game = game.cloneWithMove(2, 2) // O
  game = game.cloneWithMove(0, 0) // X
  game = game.cloneWithMove(0, 2) // O
  game = game.cloneWithMove(2, 1) // X
  game = game.cloneWithMove(0, 1) // O
  game = game.cloneWithMove(1, 2) // X
  game = game.cloneWithMove(1, 0) // O
  game = game.cloneWithMove(2, 0) // X (draw)

  const state = game.state()

  t.equal(state.openSpaces, 0)
  t.equal(state.hasDrawn, true)
  t.equal(state.hasWon, false)

  t.end()
})

test('Tic Tac Toe recognizes a player 1 win', (t) => {
  t.plan(3)

  let game = new TicTacToe()

  /**
   * o x o
   * o x -
   * x x -
   */

  game = game.cloneWithMove(1, 1) // x
  game = game.cloneWithMove(0, 0) // o
  game = game.cloneWithMove(0, 2) // x
  game = game.cloneWithMove(2, 0) // o
  game = game.cloneWithMove(1, 0) // x
  game = game.cloneWithMove(0, 1) // o
  game = game.cloneWithMove(1, 2) // x (winner)

  const state = game.state()

  t.equal(state.openSpaces, 2)
  t.equal(state.hasDrawn, false)
  t.equal(state.hasWon, 1)

  t.end()
})

test('Tic Tac Toe recognizes a player 2 win', (t) => {
  t.plan(3)

  let game = new TicTacToe()

  /**
   * o - x
   * o x -
   * o - x
   */

  game = game.cloneWithMove(2, 0) // x
  game = game.cloneWithMove(0, 0) // o
  game = game.cloneWithMove(1, 1) // x
  game = game.cloneWithMove(0, 2) // o
  game = game.cloneWithMove(2, 2) // x
  game = game.cloneWithMove(0, 1) // o (winner)

  const state = game.state()

  t.equal(state.openSpaces, 3)
  t.equal(state.hasDrawn, false)
  t.equal(state.hasWon, 2)

  t.end()
})
