class Sudoku {
  #board
  #mistakes
  #maxMistakesAllowed
  #foundedValues

  constructor() {
    this.#foundedValues = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0
    }
    this.#board =
    [ // Medium
      //0    1    2    3    4    5    6    7    8
      [' ', '8', '9', ' ', '4', ' ', '7', ' ', ' '], // 0
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
        
        const cellHasAValue = this.#board[y][x].hasAValue()
        if(cellHasAValue) this.#foundedValues[cellValue] += 1
      }
    }

    this.difficulty = 'Medium'
    this.#mistakes = 0
    this.#maxMistakesAllowed = 3
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

  checkForMistakes(x, y) {
    let areMistakes = 0
    areMistakes += this.checkForRepeatsOnRow(x)
    areMistakes += this.checkForRepeatsOnColumn(y)
    areMistakes += this.checkForRepeatsOnBlock(x, y)

    if(areMistakes) {
      this.#mistakes++
      return 1
    }
    return 0
  }

  insertValue(x, y, newValue) {
    const cell = this.#board[x][y]
    
    if(cell.getIsEditable) {
      cell.setValue = newValue

      if(!this.checkForMistakes(x, y)) {
        // cell.setIsEditable = false
      }
    }
  }

  createDomStructureForBoard() {
    const $board = document.createElement('div')
    $board.setAttribute('id', 'board')

    for(const x in this.#board) {
      for(const y in this.#board[x]) {
        const $input = this.#board[x][y].createDomElement()
        $input.setAttribute('data-row-position-on-block', +x % 3)
        $input.setAttribute('data-col-position-on-block', +y % 3)
        $input.setAttribute('data-x', x)
        $input.setAttribute('data-y', y)
        
        $input.addEventListener('input', (ev) => {
          this.insertValue(x, y, ev.currentTarget.value)
        })
        
        $input.addEventListener('focus', () => {
          console.log('Resaltar los números')
        })

        $board.append($input)
      }
    }

    return $board
  }

  createDomStructureForNumbers() {
    const $container = document.createElement('div')
    for(let i = 1; i <= 9; i++) {
      console.log({i, appears: this.#foundedValues[i]});
      const $numberContainer = document.createElement('button')
      const $number = document.createElement('p')
      const $numberLefts = document.createElement('p')

      $number.innerHTML = i
      $numberLefts.innerHTML = `${this.#foundedValues[i]}`

      $numberContainer.append($number, $numberLefts);
      $container.append($numberContainer)
    }
    return $container
  }

  /**
   * Draws the board in the console
   */
  logBoard() {
    console.log(`Mistakes: ${this.#mistakes}`)
    console.log(`  0   1   2   3   4   5   6   7   8  `)
    console.log(`----------------BOARD----------------`)
    this.#board.forEach((row, rowIndex) => {
      let consoleRow = []
      for(const col of row) {
        consoleRow.push(col.getValue)
      }
      consoleRow = `| ${consoleRow.join(' | ')} | ${rowIndex}`
      console.log(consoleRow)
      if(rowIndex % 3 === 2) {
        console.log('-'.repeat(37))
      }
    })
  }

  get getFoundedValues() {
    return this.#foundedValues
  }

}