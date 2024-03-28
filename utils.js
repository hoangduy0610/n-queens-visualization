// Function to delay execution
const delay = (t) => {
    if (pausing === 1) {
        return new Promise(resolve => {
            let interval = setInterval(() => {
                if (pausing === 0) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }
    return new Promise(resolve => setTimeout(resolve, t || DEFAULT_DELAY));
};

// Function to initialize the chessboard
function initializeBoard(n) {
    let board = [];
    for (let i = 0; i < n; i++) {
        board.push(Array.from({ length: n }).map(() => 0));
    }
    return board;
}

// Function to print the chessboard
function printBoard(board, row_a, col_a, style_a) {
    let n = board.length;
    let table = document.getElementById('chessboard');
    table.innerHTML = '';

    for (let i = 0; i < n; i++) {
        let row = table.insertRow();
        for (let j = 0; j < n; j++) {
            let cell = row.insertCell();
            if (board[i][j] === 1) {
                cell.textContent = '♕'; // Display queen
                cell.classList.add('queen');
                if (i === row_a && j === col_a) {
                    cell.style.backgroundColor = style_a === 'checked' ? '#00ff48' : 'red';
                }
            }
        }
    }
}