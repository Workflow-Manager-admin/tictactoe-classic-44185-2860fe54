//
// Main container for TicTacToe Classic - ES6, no frameworks
// Implements: 3x3 grid, two-player (on same device), win/draw detection, reset, status display, light-themed color/layout
//

// PUBLIC_INTERFACE
export function setupTicTacToe(root) {
  /**
   * Sets up the main TicTacToe Classic container inside the provided root element.
   * @param {HTMLElement} root - The DOM element to contain the game.
   *
   * PRIMARY COLOR:   #ffffff (main background)
   * SECONDARY COLOR: #222222 (grid/border/text)
   * ACCENT COLOR:    #4caf50 (winner/status/accent)
   * Theme: Light
   */

  // --- STATE ---
  let board = Array(9).fill(null); // 0-8 positions
  let xIsNext = true; // X always goes first
  let gameOver = false;
  let winner = null;

  // --- DOM ELEMENTS ---
  root.innerHTML = `
    <div class="ttt-container">
      <h1 class="ttt-title">TicTacToe Classic</h1>
      <div class="ttt-board"></div>
      <div class="ttt-status"></div>
      <button class="ttt-reset-btn">Reset Game</button>
    </div>
  `;

  const boardDiv = root.querySelector('.ttt-board');
  const statusDiv = root.querySelector('.ttt-status');
  const resetBtn = root.querySelector('.ttt-reset-btn');

  // --- RENDER BOARD ---
  function renderBoard() {
    boardDiv.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('button');
      cell.className = 'ttt-cell';
      cell.dataset.idx = i;
      cell.textContent = board[i] ? board[i] : '';
      cell.disabled = !!board[i] || gameOver;
      boardDiv.appendChild(cell);
    }
  }

  // --- GAME STATUS ---
  function getStatusText() {
    if (winner) {
      return `<span class="ttt-accent">${winner} wins!</span>`;
    } else if (gameOver) {
      return `<span class="ttt-accent">Draw!</span>`;
    } else {
      return `<span>Next turn: <span class="ttt-player">${xIsNext ? 'X' : 'O'}</span></span>`;
    }
  }

  function renderStatus() {
    statusDiv.innerHTML = getStatusText();
  }

  // --- WIN/ DRAW LOGIC ---
  function calculateWinner(board) {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6], // diags
    ];
    for (const [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  function isDraw(board) {
    return board.every(x => x) && !calculateWinner(board);
  }

  // --- HANDLERS ---
  function handleCellClick(e) {
    const idx = parseInt(e.target.dataset.idx, 10);
    if (!board[idx] && !gameOver) {
      board[idx] = xIsNext ? 'X' : 'O';
      winner = calculateWinner(board);
      if (winner) {
        gameOver = true;
      } else if (isDraw(board)) {
        gameOver = true;
      } else {
        xIsNext = !xIsNext;
      }
      renderBoard();
      renderStatus();
      attachCellListeners();
    }
  }

  function attachCellListeners() {
    boardDiv.querySelectorAll('.ttt-cell').forEach(cell =>
      cell.addEventListener('click', handleCellClick)
    );
  }

  function handleReset() {
    board = Array(9).fill(null);
    xIsNext = true;
    gameOver = false;
    winner = null;
    renderBoard();
    renderStatus();
    attachCellListeners();
  }

  // --- INITIALIZATION ---
  renderBoard();
  renderStatus();
  attachCellListeners();
  resetBtn.addEventListener('click', handleReset);
}


// --- Styling injection for light theme and layout ---
if (!document.getElementById('ttt-style')) {
  const style = document.createElement('style');
  style.id = 'ttt-style';
  style.innerHTML = `
    .ttt-container {
      background: #ffffff;
      color: #222222;
      max-width: 350px;
      margin: 3rem auto 0 auto;
      border-radius: 1.5rem;
      box-shadow: 0 4px 28px rgba(34,34,34,0.08), 0 1.5px 3px #4caf5022;
      padding: 2rem 1.5rem 2.5rem 1.5rem;
      text-align: center;
    }
    .ttt-title {
      margin-bottom: 1.3rem;
      font-size: 2.2rem;
      font-weight: 800;
      color: #222222;
      letter-spacing: 0.02em;
    }
    .ttt-board {
      display: grid;
      grid-template-columns: repeat(3, 70px);
      grid-template-rows: repeat(3, 70px);
      gap: 8px;
      margin-bottom: 1.3rem;
      justify-content: center;
    }
    .ttt-cell {
      width: 70px; height: 70px;
      background: #f7f7f7;
      border: 2px solid #222222;
      border-radius: 12px;
      font-size: 2.5rem;
      color: #222222;
      font-weight: 700;
      transition: background 0.18s, box-shadow 0.18s;
      cursor: pointer;
      outline: none;
      box-shadow: 0 2px 10px #aaaaaa11;
      user-select: none;
    }
    .ttt-cell:disabled {
      background: #e8e8e8;
      color: #bbb;
      cursor: not-allowed;
    }
    .ttt-cell:hover:not(:disabled) {
      background: #daf5de;
      box-shadow: 0 0 0 3px #4caf5055;
      border-color: #4caf50;
    }
    .ttt-status {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      min-height: 1.3em;
    }
    .ttt-accent {
      color: #4caf50;
      font-weight: 800;
      letter-spacing: 0.02em;
    }
    .ttt-reset-btn {
      background: #4caf50;
      color: #fff;
      border: none;
      border-radius: 7px;
      padding: 0.6em 2.3em;
      font-size: 1.09rem;
      font-weight: 600;
      margin-top: 0.5em;
      box-shadow: 0 2px 8px #4caf5022;
      cursor: pointer;
      transition: background 0.18s,box-shadow 0.18s;
    }
    .ttt-reset-btn:hover {
      background: #388e3c;
      box-shadow: 0 2px 14px #4caf5040;
    }
    .ttt-player {
      color: #222;
      font-weight: 800;
    }
    @media (max-width: 400px) {
      .ttt-board { grid-template-columns: repeat(3, 19vw); grid-template-rows: repeat(3, 19vw);}
      .ttt-cell { width: 19vw; height: 19vw; font-size: 8vw; }
      .ttt-container { padding: 1rem 0.3rem 1.3rem 0.3rem;}
    }
  `;
  document.head.appendChild(style);
}
