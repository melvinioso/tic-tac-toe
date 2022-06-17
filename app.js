
// an array for storing the board state
var board = [];
// X always goes first
var turn = 'X';
// winner variable
var gameWinner;
// an indexed array of all the div elements in #board
const squares = Array.from(document.querySelectorAll('#board div'));
console.log(squares);
// the message from the H2 tag for whose turn it is
const gameMessage = document.querySelector('h2');


// Possible winning moves/indexes
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// Board initialize and render
var init = () => {

  board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];

  turn = 'X';
  gameMessage.textContent = `It's ${turn}'s turn!`;
  render();
};


// Board render
var render = () => {
  // sets the text content property of the square to the move
  board.forEach((move, index) => {
    squares[index].textContent = move;
  });
};


// Handle Turn function
var handleTurn = (event) => {
  //get the index of the clicked square
  var squareIndex = squares.findIndex((square) => {
    return square === event.target;
  });

  // change the squares value to the turn value
  if (board[squareIndex] === '') {
    board[squareIndex] = turn;
  } else {
    // don't allow user to click on square that already has a move
    turn = turn === 'X' ? 'O' : 'X';
    alert("Please choose another square");
  }
  // change turns when handleTurn runs
  turn = turn === 'X' ? 'O' : 'X';
  // display the next players turn
  gameMessage.textContent = `It's ${turn}'s turn!`;
  // check if there is a winner
  // re-render board
  doWeHaveAWinner();
  render();
};


// Do we have a winner?
var doWeHaveAWinner = () => {
  var winner = null;

  // for each possible win...check if the board contains the same value for each index
  wins.forEach((combo, index) => {
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]])
      winner = board[combo[0]];
  });

  if (winner) {
    return gameMessage.textContent = `${winner} has won the game`;
  } else if (board.includes('')) {
    return null;
  } else {
    return gameMessage.textContent = "It's a tie!";
  }
};


// initialize the board
init();


/* EVENT LISTENERS */

// whenever a square on the board is clicked
document.getElementById('board').addEventListener('click', handleTurn);

// reset game board
document.getElementById('reset-button').addEventListener('click', init);