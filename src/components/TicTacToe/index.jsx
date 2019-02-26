import React from 'react';

import PropTypes from 'prop-types';

import Column from './Column';

function getColumnKey(rows, index) {
  return index + rows.reduce((acc, val) => acc + val, '');
}

const TicTacToe = ({ columns }) => (
  <div className="ttt-board">
    {columns.map((rows, index) => (
      <Column key={getColumnKey(rows, index)} rows={rows} x={index} />
    ))}
  </div>
);

TicTacToe.propTypes = {
  columns: PropTypes.array.isRequired
};

export default TicTacToe;
