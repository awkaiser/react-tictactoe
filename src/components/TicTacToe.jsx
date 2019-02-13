import React from 'react';

import PropTypes from 'prop-types';

import TicTacToeColumn from './TicTacToeColumn.jsx';

const TicTacToe = props => {
  let message = 'Game on! :)';

  if (props.hasWon) {
    message = 'Player ' + props.hasWon + ' has won the game!';
  } else if (props.hasDrawn) {
    message = 'The game has been drawn!';
  }

  return (
    <div className="ttt-game">
      <div className="ttt-board">
        {props.board.map(function(column, index) {
          return <TicTacToeColumn key={index} column={column} x={index} />;
        })}
      </div>
      <div className="ttt-message">{message}</div>
      <div className="ttt-controls">
        <button className="btn btn-primary" onClick={props.onResetClick}>
          Reset Game
        </button>
      </div>
      <div className="ttt-github">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=awkaiser&repo=react-tictactoe&type=star"
          title="github-star"
          frameBorder="0"
          scrolling="0"
          width="51px"
          height="20px"
        />
        <iframe
          src="https://ghbtns.com/github-btn.html?user=awkaiser&type=follow"
          title="github-follow"
          frameBorder="0"
          scrolling="0"
          width="123px"
          height="20px"
        />
      </div>
    </div>
  );
};

TicTacToe.propTypes = {
  board: PropTypes.array.isRequired,
  hasDrawn: PropTypes.bool,
  hasWon: PropTypes.number,
  onResetClick: PropTypes.func.isRequired
};

export default TicTacToe;
