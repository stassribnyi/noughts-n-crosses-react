import React, { Component } from 'react';

import './Game.css';

import { Board, MovesHistory } from './components';
import { calculateWinner, DEFAULT_BOARD_SIZE } from './game-utils';

export default class Game extends Component {
  constructor(props) {
    super(props);

    const boardSize = DEFAULT_BOARD_SIZE;

    this.state = {
      xIsNext: true,
      currentStep: 0,
      boardSize: boardSize,
      history: [
        {
          boardSize: boardSize,
          squares: Array(boardSize * boardSize).fill(null)
        }
      ]
    };
  }

  handleSquareClick(i) {
    const history = this.state.history.slice(0, this.state.currentStep + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const boardSize = this.state.boardSize;

    if (calculateWinner(squares, boardSize) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState(prevState => ({
      xIsNext: !prevState.xIsNext,
      currentStep: history.length,
      history: history.concat([
        {
          squares,
          boardSize
        }
      ])
    }));
  }

  handleJumpTo = step => {
    this.setState({
      currentStep: step,
      xIsNext: step % 2 === 0
    });
  };

  render() {
    const { history, boardSize } = this.state;
    const current = history[this.state.currentStep];
    const winner = calculateWinner(current.squares, boardSize);

    const status = !!winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            size={boardSize}
            onSquareClick={num => this.handleSquareClick(num)}
          />
        </div>
        <div className="game-info">
          <div className="game-status">{status}</div>
          <MovesHistory
            history={history}
            onJumpTo={this.handleJumpTo}
            currentStep={this.state.currentStep}
          />
        </div>
      </div>
    );
  }
}
