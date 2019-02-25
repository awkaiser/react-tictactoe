import React from 'react';

import PropTypes from 'prop-types';

import TicTacToeSpace from './TicTacToeSpace';

const TicTacToeColumn = React.memo(
  ({ rows, x }) => (
    <div className="ttt-column">
      {rows.map((value, y) => (
        <TicTacToeSpace key={`${x}_${y}`} value={value} x={x} y={y} />
      ))}
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.rows.every((value, index) => nextProps.rows[index] === value) &&
    prevProps.x === nextProps.x
);

TicTacToeColumn.displayName = 'TicTacToeColumn';

TicTacToeColumn.propTypes = {
  rows: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired
};

export default TicTacToeColumn;
