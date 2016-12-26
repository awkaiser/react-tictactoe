import React from 'react'
import ReactDOM from 'react-dom' // eslint-disable-line

import TicTacToeSpaceContainer from '../containers/TicTacToeSpaceContainer' // eslint-disable-line

const TicTacToeColumn = (props) => {
  return (
    <div className='ttt-column'>
      {props.column.map(function (value, y) {
        return (
          <TicTacToeSpaceContainer key={props.x + '_' + y} x={props.x} y={y} />
        )
      })}
    </div>
  )
}

TicTacToeColumn.propTypes = {
  column: React.PropTypes.array.isRequired,
  x: React.PropTypes.number.isRequired
}

export default TicTacToeColumn
