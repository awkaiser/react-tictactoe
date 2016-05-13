/**
 * Undefeatable TicTacToe
 *
 * Class for computer player logic
 *
 * Approach:
 * - Use minimax algorithm
 */

export default class TTTComPlay {
  static possibleMoves (board) {
    let moves = []

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        // Empty spaces will be `0` (falsey)
        if (!board[x][y]) {
          moves.push([x, y])
        }
      }
    }

    return moves
  }
  static score (state, depth = 0) {
    let winner = state.hasWon

    if (!winner) {
      return 0
    }

    return winner === 1 ? 10 + depth : depth - 10
  }
  static minimax (game, depth = 0) {
    if (depth >= 9) {
      throw new Error(
        'Yikes! Runaway minimax algorithm has reached an impossible depth.'
      )
    }

    let state = game.state()

    if (state.hasWon || state.hasDrawn) {
      return {
        score: TTTComPlay.score(state, depth)
      }
    }

    let possibleMoves = TTTComPlay.possibleMoves(state.board)

    let moves = []
    let scores = []

    let maxIndex
    let minIndex

    depth += 1

    possibleMoves.forEach(function checkPossibleMove (move) {
      let futureGame = game.cloneWithMove.apply(game, move)
      let possible = TTTComPlay.minimax(futureGame, depth)

      moves.push(move)
      scores.push(possible.score)
    })

    if (state.nextPlayer === 1) {
      maxIndex = scores.indexOf(Math.max.apply(Math, scores))
    } else {
      minIndex = scores.indexOf(Math.min.apply(Math, scores))
    }

    return {
      move: moves[typeof maxIndex !== 'undefined' ? maxIndex : minIndex],
      score: scores[typeof maxIndex !== 'undefined' ? maxIndex : minIndex]
    }
  }
  static openingMove (game) {
    let state = game.state()

    let corners = [
      [0, 0],
      [2, 0],
      [0, 2],
      [2, 2]
    ]

    if (state.board[1][1] === 0) {
      // Play center
      return [1, 1]
    } else {
      // Play a random corner
      return corners[Math.floor(Math.random() * 4)]
    }
  }
  static idealMove (game) {
    return TTTComPlay.minimax(game).move
  }
}
