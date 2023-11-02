let grid = document.getElementById('grid');
let status = document.getElementById('status');
let currentPlayer = '1';

// Generate a random target number between 1 and 15
let targetNumber = Math.floor(Math.random() * 15) + 1;
document.getElementById('target-number').textContent = targetNumber;

// Create the 4x4 grid
for (let i = 0; i < 16; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', onCellClick);
    grid.appendChild(cell);
}

// Assume themeButton is a button element that the user can click to switch themes
let themeButton = document.getElementById('theme-button');

themeButton.addEventListener('click', function () {
    let gameContainer = document.getElementById('game-container');
    if (gameContainer.classList.contains('theme-light')) {
        gameContainer.classList.remove('theme-light');
        gameContainer.classList.add('theme-dark');
    } else {
        gameContainer.classList.remove('theme-dark');
        gameContainer.classList.add('theme-light');
    }
});

function onCellClick(event) {
    let cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add('player-' + (currentPlayer === '1' ? '1' : '2'));
        if (checkWin()) {
            alert(currentPlayer + ' wins!');
            resetGrid();
        } else {
            currentPlayer = currentPlayer === '1' ? '0' : '1';
            status.textContent = `Player ${currentPlayer === '1' ? '1' : '2'}'s Turn`;
        }
    }
}

function checkWin() {
    let cells = document.querySelectorAll('.cell');
    let rows = [
        // Rows for a 4x4 grid
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        // Columns for a 4x4 grid
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15]
    ];
    for (let row of rows) {
        let binaryString = row.map(index => cells[index].textContent).join('');
        let decimalValue = parseInt(binaryString, 2);
        if (!isNaN(decimalValue) && decimalValue === targetNumber) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    let cells = document.querySelectorAll('.cell');
    return Array.from(cells).every(cell => cell.textContent !== '');
}


function resetGrid() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player-1', 'player-2');
    });
    currentPlayer = '1';
    status.textContent = "Player 1's Turn";
    // Generate a new random target number for the next game
    targetNumber = Math.floor(Math.random() * 15) + 1;
    document.getElementById('target-number').textContent = targetNumber;
}