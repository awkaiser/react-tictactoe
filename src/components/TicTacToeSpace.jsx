import React from 'react'
import ReactDOM from 'react-dom'

const TicTacToeSpace = React.createClass({
  propTypes: {
    state: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  render: function () {
    let classNames = ['ttt-space']
    let display = String.fromCharCode(160) // &nbsp;

    if (this.props.state === 1) {
      display = 'X'
    } else if (this.props.state === 2) {
      display = 'O'
    }

    if (!this.props.state) {
      classNames.push('ttt-space-open')
    }

    return (
      <div className={classNames.join(' ')} onClick={this.props.onClick}>
        <div className='ttt-symbol'>{display}</div>
      </div>
    )
  }
})

export default TicTacToeSpace
