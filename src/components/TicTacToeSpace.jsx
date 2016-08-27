import React from 'react'
import ReactDOM from 'react-dom' // eslint-disable-line

const TicTacToeSpace = (props) => {
  const classNames = ['ttt-space']

  let display = String.fromCharCode(160) // &nbsp;

  if (props.played === 1) {
    display = 'X'
  } else if (props.played === 2) {
    display = 'O'
  }

  if (!props.played) {
    classNames.push('ttt-space-open')
  }

  return (
    <div className={classNames.join(' ')} onClick={props.onClick}>
      <div className='ttt-symbol'>{display}</div>
    </div>
  )
}

TicTacToeSpace.propTypes = {
  played: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default TicTacToeSpace
