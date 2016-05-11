import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { ticTacToeApp } from './reducers'

import TicTacToeContainer from './containers/TicTacToeContainer'

let store = createStore(
  ticTacToeApp,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <TicTacToeContainer />
  </Provider>,
  document.getElementById('tictactoe')
)
