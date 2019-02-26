import React from 'react';

import './Game.css';

import { Board } from './components';
import { getTurnLocation, calculateWinner, DEFAULT_BOARD_SIZE } from './game-utils';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    const boardSize = DEFAULT_BOARD_SIZE;

    this.state = {
      history: [
        {
          squares: Array(boardSize * boardSize).fill(null)
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

    if (calculateWinner(squares, this.state.boardSize) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, this.state.boardSize);

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
      let desc;
      if (move) {
        let prevStep = history[move - 1];
        let { col, row } = getTurnLocation(prevStep.squares, step.squares, this.state.boardSize);
        desc = `Go to move # ${move} (${col + 1},${row + 1})`;
      } else {
        desc = 'Go to game start';
      }

      let buttonStyle =
        this.state.stepNumber === move
          ? { fontWeight: 'bold' }
          : { fontWeight: 'normal' };

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} style={buttonStyle}>
            {desc}
          </button>
        </li>
      );
    });

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
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
