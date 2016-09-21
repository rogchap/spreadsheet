/* @flow */
import { numberToLetter, isOperator, operatorMap } from './utils';

/**
 * Cell Reperesents one spreadsheet cell
 * const cell = new Cell(1, 1, 'B1 B2 +')
 *
 * @export
 * @class Cell
 */
export default class Cell {
  /**
   * The ID of the cell eg. A1, B2 ... BC44
   *
   * @type {string}
   * @memberOf Cell
   */
  id: string;

  /**
   * The Cell row number
   *
   * @type {number}
   * @memberOf Cell
   */
  row: number;

  /**
   * The Cell column number
   *
   * @type {number}
   * @memberOf Cell
   */
  col: number;

  /**
   * The original content of the Cell in postfix notation
   *
   * @type {string}
   * @memberOf Cell
   */
  content: string;

  /**
   * The computed value of the Cell
   *
   * @type {(number|string)}
   * @memberOf Cell
   */
  value: number|string;

  /**
   * Creates an instance of Cell.
   *
   * @param {number} col the column number (Zero based)
   * @param {number} row the row number (Zero based)
   * @param {string} content the content of the cell
   *
   * @memberOf Cell
   */
  constructor(col: number, row: number, content: string) {
    this.col = col;
    this.row = row;
    this.content = (content || '').toUpperCase();
    this._setId();
  }

  _setId() {
    const colName = numberToLetter(this.col);
    this.id = colName + (this.row + 1);
  }

  /**
   * Given all cell data compute the value of this Cell
   *
   * @param {{[key: string]: Cell}} data
   *
   * @memberOf Cell
   */
  compute(data: {[key: string]: Cell}) {

    // get each part of our postfix notation
    const parts = this.content.split(/\s/)
    const stack = [];
    const PostfixException = {};

    try {
      // go through each part and add to stack, ignoring any blank parts
      // https://en.wikipedia.org/wiki/Reverse_Polish_notation#Postfix_algorithm
      parts.forEach(part => {

        // First test for a operand
        if (/^(\d*(\.\d*)?)$/.test(part)) {

          // easy, just add to the stack as a number.
          stack.push(parseFloat(part));

        // Next test for an operator
        } else if (isOperator(part)) {

          // pull out the last 2 operands
          const op2 = stack.pop();
          const op1 = stack.pop();

          // we must have two operands otherwise postfix is invalid
          if(!op1 || !op2) {
            throw PostfixException;
          }
          stack.push(operatorMap[part](op1, op2));

        // Last test will be for a reference to another cell,
        // everything else (blank spaces) will be ignored.
        } else if (/^[A-Z]+\d+$/.test(part)) {

          // Now recursively get this cell's value, but if it's already computed use that.
          if (!data[part].value) {
            data[part].compute(data);
          }
          const cellRefVal = data[part].value;
          if (!cellRefVal || cellRefVal === '#ERR') {
            throw PostfixException;
          }
          stack.push(cellRefVal);
        }
      });
      // stack should be of length 1, if not something went wrong!
      this.value = stack.length === 1 ? stack[0] : '#ERR';
    } catch (error) {
      this.value = '#ERR';
    }
  }
}
