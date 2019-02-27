import React, { useCallback, useReducer } from 'react';

import TicTacToe from './TicTacToe';

import { ticTacToeApp, ticTacToeAppInit } from '../reducers';
import { resetGame } from '../actions';

import { TicTacToeStore } from '../contexts';

import styles from './App.module.css';

const App = () => {
  const [state, dispatch] = useReducer(ticTacToeApp, ticTacToeAppInit);

  const resetClick = useCallback(() => dispatch(resetGame()));

  let message = 'Game on! :)';

  if (state.winner > 0) {
    message = 'Player ' + state.winner + ' has won the game!';
  } else if (state.winner === -1) {
    message = 'The game has been drawn!';
  }

  return (
    <>
      <TicTacToeStore.Provider value={dispatch}>
        <TicTacToe columns={state.board} />
      </TicTacToeStore.Provider>
      <div className={styles.message}>{message}</div>
      <button className={styles.btn} onClick={resetClick}>
        Reset Game
      </button>
      <div className={styles.github}>
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
