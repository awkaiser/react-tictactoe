import { connect } from 'react-redux'

import { resetGame } from '../actions'

import TicTacToe from '../components/TicTacToe.jsx'

const mapStateToProps = (state) => {
  return {
    board: state.board,
    hasDrawn: state.hasDrawn,
    hasWon: state.hasWon
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResetClick: () => {
      dispatch(resetGame())
    }
  }
}

const TicTacToeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe)

export default TicTacToeContainer
