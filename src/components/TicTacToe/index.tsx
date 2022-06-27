import React from 'react';

import Column from './Column';

import styles from './index.module.css';

import type { GameState } from '../../tictactoe';

type TicTacToeProps = {
  columns: GameState['board'];
};

function getColumnKey(rows: GameState['board'][0], index: number) {
  return index + rows.reduce((acc, val) => acc + val, '');
}

const TicTacToe = ({ columns }: TicTacToeProps) => (
  <div className={styles.root}>
    {columns.map((rows, index) => (
      <Column key={getColumnKey(rows, index)} rows={rows} x={index} />
    ))}
  </div>
);

TicTacToe.displayName = 'TicTacToe';

export default TicTacToe;
