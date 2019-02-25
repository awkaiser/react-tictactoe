import React from 'react';

import PropTypes from 'prop-types';

import TicTacToeColumn from './TicTacToeColumn.jsx';

function getColumnKey(rows, index) {
  return index + rows.reduce((acc, val) => acc + val, '');
}

const TicTacToe = ({ columns }) => (
  <div className="ttt-board">
    {columns.map((rows, index) => (
      <TicTacToeColumn key={getColumnKey(rows, index)} rows={rows} x={index} />
    ))}
  </div>
);

TicTacToe.propTypes = {
  columns: PropTypes.array.isRequired
};

export default TicTacToe;
