const emptyValue = ' '
export default class Cell {
  #positionInBoard // [y, x]
  #isEditable
  #value
  #notes

  constructor({isEditable = true, value = '', positionInBoard}) {
    this.#positionInBoard = positionInBoard
    this.#isEditable = isEditable
    this.#value = value
    this.#notes = []
  }

  hasAValue() {
    return this.#value !== emptyValue
  }

  get getValue (){
    return this.#value
  }
}