// Function to check if placing a queen at position (row, col) is safe
function isSafe(board, row, col) {
    let i, j;

    // Check this row on left side
    for (i = 0; i < col; i++) {
        if (board[row][i] && i !== col) {
            return false;
        }
    }

    // Check upper diagonal on left side
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] && i !== row && j !== col) {
            return false;
        }
    }

    // Check lower diagonal on left side
    for (i = row, j = col; j >= 0 && i < board.length; i++, j--) {
        if (board[i][j] && i !== row && j !== col) {
            return false;
        }
    }

    return true;
}

async function placeQueen(board, row, col, t_delay) {
    // Place queen
    board[row][col] = 1;
    printBoard(board, row, col, 'checked');
    await delay(t_delay);
}

async function removeQueen(board, row, col, t_delay) {
    // Mark Remove queen
    printBoard(board, row, col, 'failed');
    await delay(t_delay);

    // Remove queen
    board[row][col] = 0;
    printBoard(board, row, col, 'failed');
    await delay(t_delay);
}

// Function to solve N-Queens using backtracking
async function solveNQueensUtil(board, col, t_delay = DEFAULT_DELAY) {
    const n = board.length;
    // If all queens are placed, return true
    if (col >= n) {
        printBoard(board);
        return true;
    }

    // Consider this column and try placing this queen in all rows
    for (let i = 0; i < n; i++) {
        await placeQueen(board, i, col, t_delay);
        if (isSafe(board, i, col)) {
            // Recur to place rest of the queens
            if (await solveNQueensUtil(board, col + 1, t_delay)) {
                return true;
            }

            // If placing queen in board[i][col] doesn't lead to a solution,
            // then remove queen from board[i][col]
            await removeQueen(board, i, col, t_delay);
        } else {
            // If queen can't be placed in board[i][col], then remove queen from board[i][col]
            await removeQueen(board, i, col, t_delay);
        }
    }

    // If the queen can't be placed in any row in this column, return false
    return false;
}