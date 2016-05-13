'use strict'

require('babel-register')

var test = require('tape')

var TicTacToe = require('./src/tictactoe').TicTacToe

test('Tic Tac Toe recognizes winning conditions', (t) => {
  t.plan(8)

  // Left side
  var leftSide = new TicTacToe({
    board: [
      [1, 1, 1],
      [2, 2, 0],
      [0, 0, 0]
    ],
    openSpaces: 4
  })

  t.equal(leftSide.hasWon(), 1)

  // Top side
  var topSide = new TicTacToe({
    board: [
      [1, 2, 0],
      [1, 2, 0],
      [1, 0, 0]
    ],
    openSpaces: 4
  })

  t.equal(topSide.hasWon(), 1)

  // Right side
  var rightSide = new TicTacToe({
    board: [
      [0, 0, 0],
      [1, 1, 0],
      [2, 2, 2]
    ],
    openSpaces: 4
  })

  t.equal(rightSide.hasWon(), 2)

  // Bottom side
  var bottomSide = new TicTacToe({
    board: [
      [0, 1, 2],
      [0, 1, 2],
      [0, 0, 2]
    ],
    openSpaces: 4
  })

  t.equal(bottomSide.hasWon(), 2)

  // Diagonals
  var diagonalA = new TicTacToe({
    board: [
      [2, 0, 1],
      [0, 1, 0],
      [1, 0, 2]
    ],
    openSpaces: 4
  })

  t.equal(diagonalA.hasWon(), 1)

  var diagonalB = new TicTacToe({
    board: [
      [2, 0, 1],
      [0, 2, 0],
      [1, 0, 2]
    ],
    openSpaces: 4
  })

  t.equal(diagonalB.hasWon(), 2)

  // Mixed conditions
  var mix1 = new TicTacToe({
    board: [
      [1, 2, 1],
      [1, 2, 0],
      [1, 0, 2]
    ],
    openSpaces: 2
  })

  t.equal(mix1.hasWon(), 1)

  var mix2 = new TicTacToe({
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

  var noWin1 = new TicTacToe({
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  })

  t.equal(noWin1.hasWon(), false)

  var noWin2 = new TicTacToe({
    board: [
      [0, 0, 2],
      [2, 1, 1],
      [0, 0, 0]
    ]
  })

  t.equal(noWin2.hasWon(), false)

  var noWin3 = new TicTacToe({
    board: [
      [2, 1, 2],
      [1, 1, 2],
      [1, 2, 1]
    ]
  })

  t.equal(noWin3.hasWon(), false)

  var noWin4 = new TicTacToe({
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

  var game1 = new TicTacToe()
  var game2 = game1.cloneStateWithMove(0, 0)
  var game3 = game2.cloneStateWithMove(1, 1)

  game2.move(2, 2)

  var game1State = game1.state()
  var game2State = game2.state()
  var game3State = game3.state()

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

  var game = new TicTacToe()

  var state

  /**
   * X O X
   * O X X
   * O X O
   */

  game = game.cloneStateWithMove(1, 1) // X
  game = game.cloneStateWithMove(2, 2) // O
  game = game.cloneStateWithMove(0, 0) // X
  game = game.cloneStateWithMove(0, 2) // O
  game = game.cloneStateWithMove(2, 1) // X
  game = game.cloneStateWithMove(0, 1) // O
  game = game.cloneStateWithMove(1, 2) // X
  game = game.cloneStateWithMove(1, 0) // O
  game = game.cloneStateWithMove(2, 0) // X (draw)

  state = game.state()

  t.equal(state.openSpaces, 0)
  t.equal(state.hasDrawn, true)
  t.equal(state.hasWon, false)

  t.end()
})

test('Tic Tac Toe recognizes a player 1 win', (t) => {
  t.plan(3)

  var game = new TicTacToe()

  var state

  /**
   * o x o
   * o x -
   * x x -
   */

  game = game.cloneStateWithMove(1, 1) // x
  game = game.cloneStateWithMove(0, 0) // o
  game = game.cloneStateWithMove(0, 2) // x
  game = game.cloneStateWithMove(2, 0) // o
  game = game.cloneStateWithMove(1, 0) // x
  game = game.cloneStateWithMove(0, 1) // o
  game = game.cloneStateWithMove(1, 2) // x (winner)

  state = game.state()

  t.equal(state.openSpaces, 2)
  t.equal(state.hasDrawn, false)
  t.equal(state.hasWon, 1)

  t.end()
})

test('Tic Tac Toe recognizes a player 2 win', (t) => {
  t.plan(3)

  var game = new TicTacToe()

  var state

  /**
   * o - x
   * o x -
   * o - x
   */

  game = game.cloneStateWithMove(2, 0) // x
  game = game.cloneStateWithMove(0, 0) // o
  game = game.cloneStateWithMove(1, 1) // x
  game = game.cloneStateWithMove(0, 2) // o
  game = game.cloneStateWithMove(2, 2) // x
  game = game.cloneStateWithMove(0, 1) // o (winner)

  state = game.state()

  t.equal(state.openSpaces, 3)
  t.equal(state.hasDrawn, false)
  t.equal(state.hasWon, 2)

  t.end()
})
