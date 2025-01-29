'use strict'

const sudoku = new Sudoku()
const boardContainer = document.querySelector('.board-container')
const numbersContainer = document.querySelector('#numbers')
const difficultyContainer = document.querySelector('#difficulty')
const timerContainer = document.querySelector('#timer')

boardContainer.append(sudoku.createDomStructureForBoard())
numbersContainer.append(sudoku.createDomStructureForNumbers())

// DIFFICULTY
difficultyContainer.innerText = sudoku.difficulty

// TIMER
let seconds = 0;
let minutes = 0;
setInterval(() => {
  seconds++
  if(seconds >= 60) {
    minutes++
    seconds = 0
  }

  timerContainer.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}, 1000)



/* BOARDS

[ // Medium
  [' ', '8', '9',     ' ', '4', ' ',     '7', ' ', ' '],
  ['7', '5', '2',     ' ', '6', '8',     ' ', '4', ' '],
  [' ', ' ', ' ',     ' ', ' ', '5',     '8', '6', '9'],
    
    
  ['1', ' ', '8',     '3', '7', ' ',     '5', ' ', '2'],
  ['2', '9', '3',     ' ', '5', '1',     '4', ' ', ' '],
  [' ', ' ', ' ',     ' ', '9', '6',     '1', '3', ' '],
    
    
  ['8', '1', '6',     ' ', ' ', ' ',     ' ', ' ', ' '],
  ['5', '3', ' ',     ' ', ' ', '9',     ' ', '1', ' '],
  ['9', '2', ' ',     ' ', ' ', '7',     '6', '8', ' ']
]
*/