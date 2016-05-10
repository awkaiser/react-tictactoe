/**
 * Undefeatable TicTacToe
 *
 * Assumptions:
 * - Player 1 is human, player 2 is computer
 * - Player 1 always goes first
 * - Player 2 must always win or draw the game
 */

import TTTComPlay from './tttcomplay'

// Define some WeakMaps to hold private data for class instances
// (Why?) JavaScript classes don't currently support truly private properties
let _boards = new WeakMap()
let _openSpaces = new WeakMap()
let _nextPlayers = new WeakMap()

// Class for public API of Tic Tac Toe game
export class TicTacToe {
  constructor (state = {}) {
    this.reset(state)
  }
  reset (state = {}) {
    // Multi-dimensional array for simple 3x3 board by x/y coords
    _boards.set(this, state.board || [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])

    // Default: 9 open spaces
    _openSpaces.set(this, typeof state.openSpaces === 'number'
      ? state.openSpaces : 9)

    // Default: Player 1 (human) goes first
    _nextPlayers.set(this, state.nextPlayer || 1)

    return this.state()
  }
  move (x, y) {
    let board = _boards.get(this)
    let state = this.state()

    let idealMove

    // Return early on invalid move
    if (typeof x === 'undefined' || typeof y === 'undefined' ||
        board[x][y] || state.openSpaces === 0 || state.hasWon) {
      return state
    }

    // Set chosen space to "next player" ID
    board[x][y] = state.nextPlayer

    // Decrement counter of available open spaces
    _openSpaces.set(this, state.openSpaces - 1)

    if (state.nextPlayer === 1) {
      _nextPlayers.set(this, 2)

      if (_openSpaces.get(this) > 0) {
        // Perform computer's ideal move
        idealMove = TTTComPlay.idealMove(this)

        this.move.apply(this, idealMove)
      }
    } else {
      _nextPlayers.set(this, 1)
    }

    return this.state()
  }
  state () {
    let board = _boards.get(this)

    // Check remaining open spaces
    let openSpaces = _openSpaces.get(this)

    // Check if we've reached a winning game state
    let hasWon = this.isOver()

    // Return representation of current game state
    return {
      board: board.map(function (y) {
        return y.slice()
      }), // Clone board state to preserve data integrity of game
      hasDrawn: !hasWon && openSpaces === 0,
      hasWon: hasWon, // 1 = Player 1 won, 2 = Player 2 won
      nextPlayer: _nextPlayers.get(this),
      openSpaces: openSpaces
    }
  }
  cloneStateWithMove (x, y) {
    // Moves as cloned state is useful for considering future moves + unit tests

    let board = _boards.get(this).map(function (y) {
      return y.slice()
    })

    let nextPlayer = _nextPlayers.get(this)

    board[x][y] = nextPlayer

    return new TicTacToe({
      board: board,
      nextPlayer: nextPlayer === 1 ? 2 : 1,
      openSpaces: _openSpaces.get(this) - 1
    })
  }
  isOver () {
    let board = _boards.get(this)

    let winningCombos = [
      [[0, 0], [0, 1], [0, 2]], // Left side
      [[0, 0], [1, 0], [2, 0]], // Top side
      [[2, 0], [2, 1], [2, 2]], // Right side
      [[0, 2], [1, 2], [2, 2]], // Bottom side
      [[1, 0], [1, 1], [1, 2]], // Middle vertical
      [[0, 1], [1, 1], [2, 1]], // Middle horizontal
      [[0, 0], [1, 1], [2, 2]], // First diagonal
      [[0, 2], [1, 1], [2, 0]]  // Second diagonal
    ]

    let combosRemaining = winningCombos.length

    let winner

    function playerIsWinning (first, second, third) {
      let player = board[first[0]][first[1]]

      if (!player) {
        return false
      }

      return player === board[second[0]][second[1]] &&
        player === board[third[0]][third[1]]
        ? player : false
    }

    do {
      winner = playerIsWinning.apply(this, winningCombos[combosRemaining - 1])

      combosRemaining--
    } while (!winner && combosRemaining !== 0)

    return winner // 1 or 2 for winning player, false for no win
  }
}
