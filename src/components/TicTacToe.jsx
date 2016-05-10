import React from 'react'
import ReactDOM from 'react-dom'

import TicTacToeColumn from './TicTacToeColumn.jsx'

let TicTacToe = React.createClass({
  propTypes: {
    state: React.PropTypes.object.isRequired,
    onResetClick: React.PropTypes.func.isRequired
  },
  render: function () {
    let state = this.props.state

    let message = 'Game on! :)'

    if (state.hasWon) {
      message = 'Player ' + state.hasWon + ' has won the game!'
    } else if (state.hasDrawn) {
      message = 'The game has been drawn!'
    }

    return (
      <div className='ttt-game'>
        <div className='ttt-board'>
          {state.board.map(function (column, index) {
            return (
              <TicTacToeColumn key={index} column={column} x={index} />
            )
          })}
        </div>
        <div className='ttt-message'>{message}</div>
        <div className='ttt-controls'>
          <button className='btn btn-default' onClick={this.props.onResetClick}>Reset</button>
        </div>
      </div>
    )
  }
})

export default TicTacToe
