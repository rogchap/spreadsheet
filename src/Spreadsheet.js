/* @flow */

import Cell from './Cell';

type DataCol = string;
type DataRow = Array<DataCol>;
type DataTable = Array<DataRow>;

/**
 * Represents a Spreadsheet, as columns and rows
 *
 * @export
 * @class Spreadsheet
 */
export default class Spreadsheet {
  _rawData: DataTable;
  _dataMap: {[key: string]: Cell};

  /**
   * Creates an instance of Spreadsheet.
   * data is expected in the format: [ [Col1Val, Col2Val, ...], [Col1Val, Col1Val, ...] ]
   *
   * @param {DataTable} data
   *
   * @memberOf Spreadsheet
   */
  constructor(data: DataTable) {
    this._rawData = data;
    this._dataMap = {};
    this._parseData();
  }

  _parseData() {

    // Convert the raw data into a Map so that we can ref each cell
    this._rawData.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        const cell = new Cell(colIdx, rowIdx, col);
        this._dataMap[cell.id] = cell;
      });
    });
  }

  compute() {

  }
}
