/* @flow */
import { numberToLetter } from './utils';

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
   * @type {number}
   * @memberOf Cell
   */
  value: number;

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
}
