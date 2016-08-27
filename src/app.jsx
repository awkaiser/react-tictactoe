import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux' // eslint-disable-line

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { ticTacToeApp } from './reducers'

import TicTacToeContainer from './containers/TicTacToeContainer' // eslint-disable-line

const store = createStore(
  ticTacToeApp,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <TicTacToeContainer />
  </Provider>,
  document.getElementById('tictactoe')
)
