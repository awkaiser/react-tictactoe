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
const _boards = new WeakMap()
const _openSpaces = new WeakMap()
const _nextPlayers = new WeakMap()

// Class for public API of Tic Tac Toe game
export default class TicTacToe {
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

    // Clear last state
    this._lastState = null

    return this.state()
  }
  move (x, y) {
    const board = _boards.get(this)
    const state = this.state()

    let openSpaces = state.openSpaces

    let idealMove

    // Return early on invalid move
    if (typeof x === 'undefined' || typeof y === 'undefined' ||
        state.hasWon || state.hasDrawn || board[x][y]) {
      return state
    }

    // Set chosen space to "next player" ID
    board[x][y] = state.nextPlayer

    // Decrement counter of available open spaces
    openSpaces -= 1

    // Store updated open spaces value prior to performing computer move
    _openSpaces.set(this, openSpaces)

    // Next turn!
    if (state.nextPlayer === 1) {
      _nextPlayers.set(this, 2)

      if (openSpaces) {
        // Perform computer's ideal move
        if (openSpaces === 8) {
          // Reduce minimax search space by playing center or corner first
          idealMove = TTTComPlay.openingMove(this)
        } else {
          idealMove = TTTComPlay.idealMove(this)
        }

        this.move.apply(this, idealMove)
      }
    } else {
      _nextPlayers.set(this, 1)
    }

    return this.state()
  }
  state () {
    // Check remaining open spaces
    const openSpaces = _openSpaces.get(this)

    // Don't recompute state if nothing has changed
    if (this._lastState && this._lastState.openSpaces === openSpaces) {
      return this._lastState
    }

    // Check if we've reached a winning game state
    const hasWon = this.hasWon()

    // Store and return representation of current game state
    this._lastState = {
      board: _boards.get(this).map(function (column) {
        return column.slice()
      }), // Clone board state to preserve data integrity of game
      hasDrawn: !hasWon && openSpaces === 0,
      hasWon: hasWon, // 1 = Player 1 won, 2 = Player 2 won
      nextPlayer: _nextPlayers.get(this),
      openSpaces: openSpaces
    }

    return this._lastState
  }
  cloneWithMove (x, y) {
    // Moves as cloned state is useful for considering future moves + unit tests
    const board = _boards.get(this).map(function (column) {
      return column.slice()
    })

    let nextPlayer = _nextPlayers.get(this)

    let openSpaces = _openSpaces.get(this)

    if (!board[x][y]) {
      board[x][y] = nextPlayer
      nextPlayer = nextPlayer === 1 ? 2 : 1
      openSpaces -= 1
    }

    return new TicTacToe({
      board,
      nextPlayer,
      openSpaces
    })
  }
  hasWon () {
    // Game cannot be won until the 5th move
    if (_openSpaces.get(this) > 4) {
      return 0
    }

    const board = _boards.get(this)

    const winningCombos = [
      [[0, 0], [0, 1], [0, 2]], // Left side
      [[0, 0], [1, 0], [2, 0]], // Top side
      [[2, 0], [2, 1], [2, 2]], // Right side
      [[0, 2], [1, 2], [2, 2]], // Bottom side
      [[1, 0], [1, 1], [1, 2]], // Middle vertical
      [[0, 1], [1, 1], [2, 1]], // Middle horizontal
      [[0, 0], [1, 1], [2, 2]], // First diagonal
      [[0, 2], [1, 1], [2, 0]] // Second diagonal
    ]

    let combosRemaining = winningCombos.length

    let winner

    function playerIsWinning (first, second, third) {
      const player = board[first[0]][first[1]]

      if (!player) {
        return 0
      }

      return player === board[second[0]][second[1]] &&
        player === board[third[0]][third[1]]
        ? player : 0
    }

    do {
      winner = playerIsWinning.apply(this, winningCombos[combosRemaining - 1])

      combosRemaining--
    } while (!winner && combosRemaining !== 0)

    return winner // 1 or 2 for winning player, 0 for no win
  }
}
