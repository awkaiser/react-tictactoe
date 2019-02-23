import React from 'react';

import PropTypes from 'prop-types';

const TicTacToeSpace = ({ onClick, played }) => {
  const classNames = ['ttt-space'];

  let display = String.fromCharCode(160); // &nbsp;

  if (played === 1) {
    display = 'X';
  } else if (played === 2) {
    display = 'O';
  }

  if (!played) {
    classNames.push('ttt-space-open');
  }

  return (
    <div className={classNames.join(' ')} onClick={onClick}>
      <div className="ttt-symbol">{display}</div>
    </div>
  );
};

TicTacToeSpace.propTypes = {
  onClick: PropTypes.func.isRequired,
  played: PropTypes.number.isRequired
};

export default TicTacToeSpace;
