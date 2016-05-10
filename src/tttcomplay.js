/**
 * Undefeatable TicTacToe
 *
 * Class for computer player logic
 *
 * Approach:
 * - Use minimax algorithm
 */

export default class TTTComPlay {
  static possibleMoves (game) {
    let state = game.state()

    let moves = []

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        // Empty spaces will be `0` (falsey)
        if (!state.board[x][y]) {
          moves.push([x, y])
        }
      }
    }

    return moves
  }
  static score (game, depth = 0) {
    let winner = game.isOver()

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
        score: TTTComPlay.score(game, depth)
      }
    }

    let possibleMoves = TTTComPlay.possibleMoves(game)

    let moves = []
    let scores = []

    let maxIndex
    let minIndex

    depth += 1

    possibleMoves.forEach(function checkPossibleMove (move) {
      let futureGame = game.cloneStateWithMove.apply(game, move)
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
  static idealMove (game) {
    return TTTComPlay.minimax(game).move
  }
}
