import { expect } from 'chai';
import Spreadsheet from '../src/Spreadsheet';
import Cell from '../src/Cell';

describe('Spreadsheet', () => {
  let spreadsheet;

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

  describe('compute data', () => {

    const dataTable = [
      [ 'b1 b2 +', '2 b2 3 * -', ' 3 ', '+' ],
      [ 'a1     ', '5         ', '   ', '7 2 /' ],
      [ 'c2 3 * ', '1 2       ', '   ', '5 1 2 + 4 * + 3 -' ],
    ];

    beforeEach(() => {
      spreadsheet = new Spreadsheet(dataTable);
    });

    it('should have no cell values before compute', () => {
      expect(spreadsheet._dataMap['A1'].value).to.not.exist;
      expect(spreadsheet._dataMap['B1'].value).to.not.exist;
      expect(spreadsheet._dataMap['C1'].value).to.not.exist;
    });

    it('should have cell values after compute', () => {
      spreadsheet.compute();
      expect(spreadsheet._dataMap['A1'].value).to.exist;
      expect(spreadsheet._dataMap['B1'].value).to.exist;
      expect(spreadsheet._dataMap['C1'].value).to.exist;
    });

    it('should have correct cell values after compute', () => {
      spreadsheet.compute();
      expect(spreadsheet._dataMap['A1'].value, 'A1').to.equal(-8);
      expect(spreadsheet._dataMap['B1'].value, 'B1').to.equal(-13);
      expect(spreadsheet._dataMap['C1'].value, 'C1').to.equal(3);
      expect(spreadsheet._dataMap['D1'].value, 'D1').to.equal('#ERR');

      expect(spreadsheet._dataMap['A2'].value, 'A2').to.equal(-8);
      expect(spreadsheet._dataMap['B2'].value, 'B2').to.equal(5);
      expect(spreadsheet._dataMap['C2'].value, 'C2').to.equal(0);
      expect(spreadsheet._dataMap['D2'].value, 'D2').to.equal(3.5);

      expect(spreadsheet._dataMap['A3'].value, 'A3').to.equal(0);
      expect(spreadsheet._dataMap['B3'].value, 'B3').to.equal('#ERR');
      expect(spreadsheet._dataMap['C3'].value, 'C3').to.equal(0);
      expect(spreadsheet._dataMap['D3'].value, 'D3').to.equal(14);
    });
  });
});
