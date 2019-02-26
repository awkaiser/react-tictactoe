import React from 'react';

import PropTypes from 'prop-types';

import Space from './Space';

const Column = React.memo(
  ({ rows, x }) => (
    <div className="ttt-column">
      {rows.map((value, y) => (
        <Space key={`${x}_${y}`} value={value} x={x} y={y} />
      ))}
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.rows.every((value, index) => nextProps.rows[index] === value) &&
    prevProps.x === nextProps.x
);

Column.displayName = 'TicTacToeColumn';

Column.propTypes = {
  rows: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired
};

export default Column;
