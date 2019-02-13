import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';

import { ticTacToeApp } from './reducers';

import TicTacToeContainer from './containers/TicTacToeContainer';

const store = createStore(ticTacToeApp, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <TicTacToeContainer />
  </Provider>,
  document.getElementById('tictactoe')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
