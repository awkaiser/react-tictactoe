import React, { useCallback, useReducer } from 'react';

import TicTacToe from './TicTacToe.jsx';

import { ticTacToeApp, ticTacToeAppInit } from '../reducers';
import { resetGame } from '../actions';

import { TicTacToeStore } from '../contexts';

const App = () => {
  const [state, dispatch] = useReducer(ticTacToeApp, ticTacToeAppInit);

  const resetClick = useCallback(() => dispatch(resetGame()));

  let message = 'Game on! :)';

  if (state.hasWon > 0) {
    message = 'Player ' + state.hasWon + ' has won the game!';
  } else if (state.hasWon === -1) {
    message = 'The game has been drawn!';
  }

  return (
    <>
      <TicTacToeStore.Provider value={dispatch}>
        <TicTacToe columns={state.board} />
      </TicTacToeStore.Provider>
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
    </>
  );
};

export default App;
