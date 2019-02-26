import React, { Component } from 'react';

import './Board.css';

import Square from '../square';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.generateGrid(3)
    };
  }

  generateGrid(size) {
    const rows = [];

    for (let i = 0; i < size; i++) {
      const cells = [];

      for (let j = 0; j < size; j++) {
        cells.push(i * 3 + j);
      }

      rows.push(cells);
    }

    return rows;
  }

  render() {
    const fetSquareValue = num => this.props.squares[num];
    const onSquareClick = num => this.props.onClick(num);

    return (
      <div className="board">
        {this.state.rows.map((cells, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {cells.map((cellNumber, cellIndex) => (
              <Square
                key={cellIndex}
                value={fetSquareValue(cellNumber)}
                onClick={() => onSquareClick(cellNumber)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
