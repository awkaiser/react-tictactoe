import React from 'react';

import PropTypes from 'prop-types';

const TicTacToeSpace = props => {
  const classNames = ['ttt-space'];

  let display = String.fromCharCode(160); // &nbsp;

  if (props.played === 1) {
    display = 'X';
  } else if (props.played === 2) {
    display = 'O';
  }

  if (!props.played) {
    classNames.push('ttt-space-open');
  }

  return (
    <div className={classNames.join(' ')} onClick={props.onClick}>
      <div className="ttt-symbol">{display}</div>
    </div>
  );
};

TicTacToeSpace.propTypes = {
  played: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TicTacToeSpace;
