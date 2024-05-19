import React from 'react';

import Space from './Space';

import styles from './Column.module.css';

import type { GameState } from '../../tictactoe';

type ColumnProps = {
  rows: GameState['board'][0];
  x: number;
};

const Column = React.memo(
  ({ rows, x }: ColumnProps) => (
    <div className={styles.root}>
      {rows.map((value, y) => (
        <Space key={`${x}_${y}`} value={value} x={x} y={y} />
      ))}
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.rows.every((value, index) => nextProps.rows[index] === value) &&
    prevProps.x === nextProps.x,
);

Column.displayName = 'TicTacToeColumn';

export default Column;
