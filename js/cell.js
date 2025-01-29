'use strict'

const emptyValue = ' '
class Cell {
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
  
  createDomElement() {
    const $input = document.createElement('input')
    $input.className = 'board__cell'
    $input.value = this.#value

    if(!this.#isEditable) {
      $input.readOnly = true
    }
    $input.readOnly = true

    return $input
  }

  hasAValue() {
    return this.#value !== emptyValue
  }

  get getIsEditable(){
    return this.#isEditable
  }

  get getValue(){
    return this.#value
  }

  set setIsEditable (newValue) {
    this.#isEditable = newValue
  }

  set setValue(newValue) {
    if(this.#isEditable && Number(newValue) > 0 && Number(newValue) < 10) {
      this.#value = newValue
      return 1
    }
    return 0
  }
}