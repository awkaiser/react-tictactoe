import { connect } from 'react-redux'

import { startMove, makeMove } from '../actions'

import TicTacToe from '../components/TicTacToeSpace.jsx'

const mapStateToProps = (state, ownProps) => {
  let value = state.board[ownProps.x][ownProps.y]

  return {
    state: value || 0
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(makeMove(ownProps.x, ownProps.y))
    }
  }
}

const TicTacToeSpaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe)

export default TicTacToeSpaceContainer
