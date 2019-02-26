/**
 * Undefeatable TicTacToe
 *
 * Computer player logic
 *
 * Approach:
 * - Use minimax algorithm
 */

const CORNERS = [[0, 0], [2, 0], [0, 2], [2, 2]];
const MAX_DEPTH = 9;

function score(state, depth = 0) {
  if (!state.winner) return 0;

  return depth + (state.winner === 1 ? MAX_DEPTH : -MAX_DEPTH);
}

function minimax(game, depth = 0) {
  if (depth >= MAX_DEPTH) throw new Error('Minimax reached impossible depth');

  const state = game.state;

  if (state.winner !== 0) return { score: score(state, depth) };

  const possibleMoves = game.openSpaces;

  const moves = [];
  const scores = [];

  let maxIndex;
  let minIndex;

  depth += 1;

  possibleMoves.forEach(function checkPossibleMove(move) {
    const futureGame = game.cloneWithMove.apply(game, move);
    const possible = minimax(futureGame, depth);

    moves.push(move);
    scores.push(possible.score);
  });

  if (state.nextPlayer === 1) {
    maxIndex = scores.indexOf(Math.max.apply(Math, scores));
  } else {
    minIndex = scores.indexOf(Math.min.apply(Math, scores));
  }

  return {
    move: moves[maxIndex !== undefined ? maxIndex : minIndex],
    score: scores[maxIndex !== undefined ? maxIndex : minIndex]
  };
}

function openingMove(game) {
  // Play center or random corner
  return game.state.board[1][1] === 0
    ? [1, 1]
    : CORNERS[Math.floor(Math.random() * 4)];
}

export default function TTTComPlay(game) {
  // Reduce minimax search space with opening move
  return game.openSpaces.length === 8 ? openingMove(game) : minimax(game).move;
}
