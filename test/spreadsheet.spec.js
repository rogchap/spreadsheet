import { expect } from 'chai';
import Spreadsheet from '../src/Spreadsheet';
import Cell from '../src/Cell';

describe('Spreadsheet', () => {
  let spreadsheet;

  // const dataTable = [
  //   [ 'b1 b2 +', '2 b2 3 *', '3', '+' ],
  //   [ 'a1     ', '5         ','   ', '7 2 /' ],
  //   [ 'c2 3 * ', '1 2       ', '   ', '5 1 2 + 4 * + 3' ­],
  // ];

  // beforeEach(() => {
  //   spreadsheet = new Spreadsheet(dataTable);
  // });

  describe('parsing data', () => {
    const dt = [
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ];

    beforeEach(() => {
      spreadsheet = new Spreadsheet(dt);
    });

    describe('#_dataMap', () => {
      it('does exist', () => {
        expect(spreadsheet._dataMap, 'spreadsheet._dataMap').to.exist;
      });

      it('should have a correct key/value', () => {
        expect(spreadsheet._dataMap).to.have.property('A1');
        expect(spreadsheet._dataMap).to.have.property('B1');
        expect(spreadsheet._dataMap).to.have.property('C1');
        expect(spreadsheet._dataMap).to.have.property('A2');
        expect(spreadsheet._dataMap).to.have.property('B2');
        expect(spreadsheet._dataMap).to.have.property('C2');
      });

      it('should have a Cell as value', () => {
        expect(spreadsheet._dataMap['A1']).to.be.an.instanceof(Cell);
      });

      it('should have key match Cell ID', () => {
        expect(spreadsheet._dataMap['A1'].id).to.equal('A1');
      });

    });
  });


})
