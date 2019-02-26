import React from 'react';

import './Game.css';

import { Board, MovesHistory } from './components';
import { calculateWinner, DEFAULT_BOARD_SIZE } from './game-utils';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    const boardSize = DEFAULT_BOARD_SIZE;

    this.state = {
      history: [
        {
          squares: Array(boardSize * boardSize).fill(null),
          boardSize
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      boardSize: boardSize
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const boardSize = this.state.boardSize;

    if (calculateWinner(squares, boardSize) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          boardSize
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, this.state.boardSize);

    const status = !!winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            size={this.state.boardSize}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <MovesHistory
            history={history}
            jumpTo={this.jumpTo}
            currentStep={this.state.stepNumber}
          />
        </div>
      </div>
    );
  }
}
