'use strict'

require('babel-register')

var test = require('tape')

var TicTacToe = require('./src/tictactoe').TicTacToe

test('Tic Tac Toe recognizes winning conditions', (t) => {
  t.plan(8)

  // Left row
  var leftRow = new TicTacToe({
    board: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0]
    ]
  })

  t.equal(leftRow.isOver(), 1)

  // Top row
  var topRow = new TicTacToe({
    board: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0]
    ]
  })

  t.equal(topRow.isOver(), 1)

  // Right row
  var rightRow = new TicTacToe({
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [2, 2, 2]
    ]
  })

  t.equal(rightRow.isOver(), 2)

  // Bottom row
  var bottomRow = new TicTacToe({
    board: [
      [0, 0, 2],
      [0, 0, 2],
      [0, 0, 2]
    ]
  })

  t.equal(bottomRow.isOver(), 2)

  // Diagonals
  var diagonalA = new TicTacToe({
    board: [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0]
    ]
  })

  t.equal(diagonalA.isOver(), 1)

  var diagonalB = new TicTacToe({
    board: [
      [2, 0, 0],
      [0, 2, 0],
      [0, 0, 2]
    ]
  })

  t.equal(diagonalB.isOver(), 2)

  // Mixed conditions
  var mix1 = new TicTacToe({
    board: [
      [1, 2, 1],
      [1, 2, 0],
      [1, 0, 2]
    ]
  })

  t.equal(mix1.isOver(), 1)

  var mix2 = new TicTacToe({
    board: [
      [1, 1, 1],
      [1, 2, 2],
      [2, 2, 1]
    ]
  })

  t.equal(mix2.isOver(), 1)

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

  t.equal(noWin1.isOver(), false)

  var noWin2 = new TicTacToe({
    board: [
      [0, 0, 2],
      [2, 1, 1],
      [0, 0, 0]
    ]
  })

  t.equal(noWin2.isOver(), false)

  var noWin3 = new TicTacToe({
    board: [
      [2, 1, 2],
      [1, 1, 2],
      [1, 2, 1]
    ]
  })

  t.equal(noWin3.isOver(), false)

  var noWin4 = new TicTacToe({
    board: [
      [1, 2, 2],
      [2, 1, 1],
      [1, 1, 2]
    ]
  })

  t.equal(noWin4.isOver(), false)

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

  t.deepEqual(game1State.board[0][0], 0)

  t.deepEqual(game2State.board[0][0], 1)
  t.deepEqual(game2State.board[1][1], 0)
  t.deepEqual(game2State.board[2][2], 2)

  t.deepEqual(game3State.board[0][0], 1)
  t.deepEqual(game3State.board[1][1], 2)
  t.deepEqual(game3State.board[2][2], 0)

  t.end()
})

test('Tic Tac Toe players can draw game', (t) => {
  t.plan(3)

  var game = new TicTacToe()

  var state

  game = game.cloneStateWithMove(1, 1)
  game = game.cloneStateWithMove(2, 2)
  game = game.cloneStateWithMove(0, 0)
  game = game.cloneStateWithMove(0, 2)
  game = game.cloneStateWithMove(2, 1)
  game = game.cloneStateWithMove(0, 1)
  game = game.cloneStateWithMove(1, 2)
  game = game.cloneStateWithMove(1, 0)
  game = game.cloneStateWithMove(0, 2)

  state = game.state()

  t.equal(state.openSpaces, 0)
  t.equal(state.hasDrawn, true)
  t.equal(state.hasWon, false)

  t.end()
})

test('Tic Tac Toe recognizes a player 1 win', (t) => {
  t.plan(4)

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
  t.equal(game.isOver(), 1)

  t.end()
})

test('Tic Tac Toe recognizes a player 2 win', (t) => {
  t.plan(4)

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
  t.equal(game.isOver(), 2)

  t.end()
})
