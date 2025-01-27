import Cell from './cell.js'

class Sudoku {
  #board

  constructor() {
    this.#board =
    [ // Medium
      //0    1    2    3    4    5    6    7    8
      ['2', '8', '9', ' ', '4', ' ', '7', ' ', ' '], // 0
      ['7', '5', '2', ' ', '6', '8', ' ', '4', ' '], // 1
      [' ', ' ', ' ', ' ', ' ', '5', '8', '6', '9'], // 2
      ['1', ' ', '8', '3', '7', ' ', '5', ' ', '2'], // 3
      ['2', '9', '3', ' ', '5', '1', '4', ' ', ' '], // 4
      [' ', ' ', ' ', ' ', '9', '6', '1', '3', ' '], // 5
      ['8', '1', '6', ' ', ' ', ' ', ' ', ' ', ' '], // 6
      ['5', '3', ' ', ' ', ' ', '9', ' ', '1', ' '], // 7
      ['9', '2', ' ', ' ', ' ', '7', '6', '8', ' ']  // 8
    ]

    // Replace the strings in the board for an object
    for(let y in this.#board) {
      for(let x in this.#board[y]) {
        const cellValue = this.#board[y][x]
        const isEditable = cellValue === ' '? true : false

        if(isEditable) {
          this.#board[y][x] = new Cell({isEditable, value: cellValue, positionInBoard: [y, x]})
        }else {
          this.#board[y][x] = new Cell({isEditable: false, value: cellValue, positionInBoard: [y, x]})
        }
      }
    }

    this.selectedCell = -1
  }

  checkForRepeatsOnRow(x) {
    const foundedValues = []

    for(const currentCell of this.#board[x]) {
      if(currentCell.hasAValue() && foundedValues.includes(currentCell.getValue)) {
        // The cell is repeated
        return 1
      }else {
        foundedValues.push(currentCell.getValue);
      }
    }
    return 0
  }

  checkForRepeatsOnColumn(y) {
    const foundedValues = []

    for(const currentRow of this.#board) {
      const foundedCell = currentRow.at(y)

      if(foundedCell.hasAValue() && foundedValues.includes(foundedCell.getValue)) {
        // The cell is repeated
        return 1
      }else {
        foundedValues.push(foundedCell.getValue);
      }
    }
    return 0
  }

  checkForRepeatsOnBlock(x, y) {
    const foundedValues = []
    const rowPositionOnBlock = x % 3
    const colPositionOnBlock = y % 3
    /*x/y % 3 = 0:  First row/col of the block
      x/y % 3 = 1: Second row/col of the block
      x/y % 3 = 2:  Third row/col of the block*/
    const initialValueOfXForBucle = x - rowPositionOnBlock
    const initialValueOfYForBucle = y - colPositionOnBlock

    for(let xFromBucle = initialValueOfXForBucle; xFromBucle < initialValueOfXForBucle + 3; xFromBucle++) {
      for(let yFromBucle = initialValueOfYForBucle; yFromBucle < initialValueOfYForBucle + 3; yFromBucle++) {
        const foundedCell = this.#board[xFromBucle][yFromBucle]
        console.log(foundedCell.getValue)
        if(foundedCell.hasAValue() && foundedValues.includes(foundedCell.getValue)) {
          // The cell is repeated
          return 1
        }else {
          foundedValues.push(foundedCell.getValue);
        }
      }
    }
    return 0
  }
}

const sudoku = new Sudoku()
console.log(sudoku.checkForRepeatsOnBlock(4, 4))