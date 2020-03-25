/**
 * Undefeatable TicTacToe
 *
 * Computer player logic
 *
 * Approach:
 * - Use minimax algorithm
 */

const CORNERS = [
  [0, 0],
  [2, 0],
  [0, 2],
  [2, 2],
];
const MAX_DEPTH = 9;

function score({ winner }, depth = 0) {
  if (!winner) return 0;

  return depth + (winner === 1 ? MAX_DEPTH : -MAX_DEPTH);
}

function minimax(game, depth = 0) {
  if (depth >= MAX_DEPTH) throw new Error('Minimax reached impossible depth');

  if (game.winner !== 0) return { score: score(game, depth) };

  const moves = [];
  const scores = [];

  game.openSpaces.forEach((move) => {
    const { score } = minimax(game.cloneMove.apply(game, move), depth + 1);

    moves.push(move);
    scores.push(score);
  });

  const index = scores.indexOf(
    Math[game.nextPlayer === 1 ? 'max' : 'min'].apply(Math, scores)
  );

  return { move: moves[index], score: scores[index] };
}

function openingMove({ board }) {
  // Play center or random corner
  return board[1][1] === 0 ? [1, 1] : CORNERS[Math.floor(Math.random() * 4)];
}

export default function TTTComPlay(game) {
  // Reduce minimax search space with opening move
  return game.openSpaces.length === 8 ? openingMove(game) : minimax(game).move;
}
