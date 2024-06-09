document.addEventListener('DOMContentLoaded', () => {
  const BOARD_SIZE = 15;
  let board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(null)
  );
  let currentPlayer = 'black';
  let gameOver = false;

  const boardElement = document.getElementById('board');

  // Initialize the board
  function createBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', onCellClick);
        boardElement.appendChild(cell);
      }
    }
  }

  // Handle cell click
  function onCellClick(event) {
    if (gameOver) return;

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col]) return; // Cell already occupied

    board[row][col] = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWin(row, col)) {
      setTimeout(
        () =>
          alert(
            `${
              currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
            } wins!`
          ),
        10
      );
      gameOver = true;
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  }

  // Check for a win
  function checkWin(row, col) {
    const directions = [
      { dr: 1, dc: 0 }, // vertical
      { dr: 0, dc: 1 }, // horizontal
      { dr: 1, dc: 1 }, // diagonal \
      { dr: 1, dc: -1 }, // diagonal /
    ];

    for (const { dr, dc } of directions) {
      let count = 1;
      count += countStones(row, col, dr, dc);
      count += countStones(row, col, -dr, -dc);
      if (count >= 5) return true;
    }

    return false;
  }

  // Count consecutive stones in a direction
  function countStones(row, col, dr, dc) {
    let count = 0;
    let r = row + dr;
    let c = col + dc;
    while (
      r >= 0 &&
      r < BOARD_SIZE &&
      c >= 0 &&
      c < BOARD_SIZE &&
      board[r][c] === currentPlayer
    ) {
      count++;
      r += dr;
      c += dc;
    }
    return count;
  }

  createBoard();
});
