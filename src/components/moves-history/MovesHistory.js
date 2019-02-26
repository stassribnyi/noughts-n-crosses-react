import React from 'react';

import './MovesHistory.css';

import { getTurnLocation } from '../../game-utils';

const getHistoryButtonName = (history, step, move) => {
  if (move === 0) {
    return 'Go to game start';
  }

  const prevStep = history[move - 1];

  const { col, row } = getTurnLocation(
    prevStep.squares,
    step.squares,
    step.boardSize
  );

  return `Go to move #${move} (${col + 1}, ${row + 1})`;
};

export default props => {
  const { currentStep, history, onJumpTo } = props;

  return (
    <ol className="move-history">
      {history.map((step, move) => {
        const buttonName = getHistoryButtonName(history, step, move);

        const buttonClass = [
          'history-btn',
          currentStep === move ? 'active' : ''
        ].join(' ');

        return (
          <li key={move}>
            <button className={buttonClass} onClick={() => onJumpTo(move)}>
              {buttonName}
            </button>
          </li>
        );
      })}
    </ol>
  );
};
