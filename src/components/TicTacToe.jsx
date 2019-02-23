import React, { useReducer } from 'react';

import TicTacToeColumn from './TicTacToeColumn.jsx';

import { ticTacToeApp, ticTacToeAppInit } from '../reducers';
import { resetGame } from '../actions';

import { TicTacToeStore } from '../contexts';

const TicTacToe = () => {
  const [state, dispatch] = useReducer(ticTacToeApp, ticTacToeAppInit);

  let message = 'Game on! :)';

  if (state.hasWon) {
    message = 'Player ' + state.hasWon + ' has won the game!';
  } else if (state.hasDrawn) {
    message = 'The game has been drawn!';
  }

  function resetClick() {
    dispatch(resetGame());
  }

  return (
    <TicTacToeStore.Provider value={{ dispatch, state }}>
      <div className="ttt-game">
        <div className="ttt-board">
          {state.board.map(function(column, index) {
            return <TicTacToeColumn key={index} column={column} x={index} />;
          })}
        </div>
        <div className="ttt-message">{message}</div>
        <div className="ttt-controls">
          <button className="btn btn-primary" onClick={resetClick}>
            Reset Game
          </button>
        </div>
        <div className="ttt-github">
          <iframe
            frameBorder="0"
            height="20px"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=awkaiser&repo=react-tictactoe&type=star"
            title="github-star"
            width="51px"
          />
          <iframe
            frameBorder="0"
            height="20px"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=awkaiser&type=follow"
            title="github-follow"
            width="123px"
          />
        </div>
      </div>
    </TicTacToeStore.Provider>
  );
};

export default TicTacToe;
