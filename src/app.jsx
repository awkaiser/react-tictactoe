import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { createStore } from 'redux'

import { ticTacToeApp } from './reducers'

import TicTacToeContainer from './containers/TicTacToeContainer'

let store = createStore(ticTacToeApp)

ReactDOM.render(
  <Provider store={store}>
    <TicTacToeContainer />
  </Provider>,
  document.getElementById('tictactoe')
)
