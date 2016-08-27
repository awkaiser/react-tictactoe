import React from 'react'
import ReactDOM from 'react-dom' // eslint-disable-line

import TicTacToeColumn from './TicTacToeColumn.jsx' // eslint-disable-line

const TicTacToe = (props) => {
  const state = props.state

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
        <button className='btn btn-primary' onClick={props.onResetClick}>Reset Game</button>
      </div>
      <div className='ttt-github'>
        <iframe src='https://ghbtns.com/github-btn.html?user=awkaiser&repo=react-tictactoe&type=star' frameBorder='0' scrolling='0' width='51px' height='20px'></iframe>
        <iframe src='https://ghbtns.com/github-btn.html?user=awkaiser&type=follow' frameBorder='0' scrolling='0' width='123px' height='20px'></iframe>
      </div>
    </div>
  )
}

TicTacToe.propTypes = {
  state: React.PropTypes.object.isRequired,
  onResetClick: React.PropTypes.func.isRequired
}

export default TicTacToe
