import React from 'react'
import ReactDOM from 'react-dom'

import TicTacToeSpaceContainer from '../containers/TicTacToeSpaceContainer'

let TicTacToeColumn = React.createClass({
  propTypes: {
    column: React.PropTypes.array.isRequired,
    x: React.PropTypes.number.isRequired
  },
  render: function () {
    let x = this.props.x

    return (
      <div className='ttt-column'>
        {this.props.column.map(function (value, y) {
          return (
            <TicTacToeSpaceContainer key={x + '_' + y} x={x} y={y} />
          )
        })}
      </div>
    )
  }
})

export default TicTacToeColumn
