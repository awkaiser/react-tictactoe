import React, { useCallback, useContext } from 'react';

import PropTypes from 'prop-types';

import { TicTacToeStore } from '../../contexts';
import { makeMove } from '../../actions';

import styles from './Space.module.css';

const Space = React.memo(
  ({ value, x, y }) => {
    const dispatch = useContext(TicTacToeStore);

    const classNames = [styles.root];

    const click = useCallback(() => dispatch(makeMove(x, y)), [dispatch, x, y]);

    let display = String.fromCharCode(160); // &nbsp;

    if (value === 1) {
      display = 'X';
    } else if (value === 2) {
      display = 'O';
    } else {
      classNames.push(styles.open);
    }

    return (
      <div className={classNames.join(' ')} onClick={click}>
        <div className={styles.symbol}>{display}</div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

Space.displayName = 'TicTacToeSpace';

Space.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Space;
