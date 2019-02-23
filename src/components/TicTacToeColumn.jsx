import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import { TicTacToeStore } from '../contexts';
import { makeMove } from '../actions';

import TicTacToeSpace from './TicTacToeSpace';

const TicTacToeColumn = ({ column, x }) => {
  const { dispatch, state } = useContext(TicTacToeStore);

  return (
    <div className="ttt-column">
      {column.map(function(value, y) {
        function click() {
          dispatch(makeMove(x, y));
        }

        return (
          <TicTacToeSpace
            key={x + '_' + y}
            onClick={click}
            played={state.board[x][y] || 0}
          />
        );
      })}
    </div>
  );
};

TicTacToeColumn.propTypes = {
  column: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired
};

export default TicTacToeColumn;
