import React from 'react';

import PropTypes from 'prop-types';

import Column from './Column';

import styles from './index.module.css';

function getColumnKey(rows, index) {
  return index + rows.reduce((acc, val) => acc + val, '');
}

const TicTacToe = ({ columns }) => (
  <div className={styles.root}>
    {columns.map((rows, index) => (
      <Column key={getColumnKey(rows, index)} rows={rows} x={index} />
    ))}
  </div>
);

TicTacToe.displayName = 'TicTacToe';

TicTacToe.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default TicTacToe;
