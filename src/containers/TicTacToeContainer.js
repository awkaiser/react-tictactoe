import { connect } from 'react-redux'

import { resetGame } from '../actions'

import TicTacToe from '../components/TicTacToe.jsx'

const mapStateToProps = (state) => {
  return {
    state
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
