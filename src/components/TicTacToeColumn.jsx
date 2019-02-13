import React from 'react';

import PropTypes from 'prop-types';

import TicTacToeSpaceContainer from '../containers/TicTacToeSpaceContainer';

const TicTacToeColumn = props => {
  return (
    <div className="ttt-column">
      {props.column.map(function(value, y) {
        return (
          <TicTacToeSpaceContainer key={props.x + '_' + y} x={props.x} y={y} />
        );
      })}
    </div>
  );
};

TicTacToeColumn.propTypes = {
  column: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired
};

export default TicTacToeColumn;
