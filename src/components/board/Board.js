import React, { Component } from 'react';

import './Board.css';

import Square from '../square';

export default class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {Array(3)
          .fill(null)
          .map((rv, ri) => (
            <div className="board-row">
              {Array(3)
                .fill(null)
                .map((cv, ci) => this.renderSquare(ri * 3 + ci))}
            </div>
          ))}
      </div>
    );
  }
}
