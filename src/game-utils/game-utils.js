export const DEFAULT_BOARD_SIZE = 3;

export function getTurnLocation(prev, current, boardSize = DEFAULT_BOARD_SIZE) {
  const index = current.findIndex((v, i) => v !== prev[i]);

  return {
    col: index % boardSize,
    row: Math.floor(index / boardSize)
  };
}

export function calculateWinner(squares, boardSize = DEFAULT_BOARD_SIZE) {
  if (boardSize !== DEFAULT_BOARD_SIZE) {
    throw new Error('Board sizes higher then 3 is not supported yet!');
  }

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
