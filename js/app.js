/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board = []

let turn = "X"

let winner = false

let tie = false

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetButton = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]
    winner = false
    tie = false
    turn = 'X'
    render()
}

function render() {
    updateBoard()
    checkForWinner()
    checkForTie()
    placePiece()
    updateMessage()    
}

function updateBoard() {
    board.forEach(function(square, idx) {
        squareEls[idx].textContent = square
    })
}

function updateMessage() {
    messageEl.textContent = winner ? `${winner} wins` : tie ? "It's a tie" : `${turn}'s turn`
    if (winner) {
        resetButton.style.display = 'block'
    }
}

function placePiece() {
    board.forEach(function(square, idx) {
        if (board[idx] === 'X') {
            squareEls[idx].classList.add('X')
        } else if (board[idx] === 'O') {
            squareEls[idx].classList.add('O')
        }
    })
}

function checkForWinner() {
    winningCombos.forEach(function(combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]]
        }
    })
}

function checkForTie() {
    if (board.includes('')) {
        tie = false
    } else {
        tie = true
        resetButton.style.display = 'block'
    }
}
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function(square, idx) {
    square.addEventListener('click', function() {
        if (board[idx] || winner) return
        board[idx] = turn
        turn = turn === 'X' ? 'O' : 'X'
        render()
    })
})

resetButton.addEventListener('click', function() {
    resetButton.style.display = 'none'
    init()
})

init()