import { connect } from 'react-redux';

import { makeMove } from '../actions';

import TicTacToe from '../components/TicTacToeSpace.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    played: state.board[ownProps.x][ownProps.y] || 0
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(makeMove(ownProps.x, ownProps.y));
    }
  };
};

const TicTacToeSpaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe);

export default TicTacToeSpaceContainer;
