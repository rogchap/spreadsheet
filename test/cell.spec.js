import { expect } from 'chai';
import Cell from '../src/Cell';

describe('Cell', () => {

  let cell;

  beforeEach(() => {
    // Create a new Cell object for each test
    cell = new Cell(5, 1, 'Blah');
  });

  describe('#id', () => {

    it('returns an ID', () => {
      expect(cell.id, 'cell.id').to.exist;
    });

    it('returns the correct ID for the row/col', () => {
      // Cell col and row is zero based
      expect(cell.id).to.equal('F2');
    });
  });

  describe('#content', () => {

    it('should be all uppercase', () => {
      expect(cell.content).to.equal('BLAH');
    });
  });

  describe('#value', () => {

    it('should initialy not exist', () => {
      expect(cell.value).to.not.exist;
    });
  });

  describe('#compute', () => {

    it('should set the value', () => {
      cell.compute({});
      expect(cell.value).to.exist;
    });

    it('should calculate the correct value', () => {
      cell = new Cell(0, 0, '2 5 +');
      cell.compute({});
      expect(cell.value).to.equal(7);
    });

    it('should calculate the correct value based on other cell refs', () => {
      cell = new Cell(0, 0, 'B1 B2 +');
      cell.compute({
        B1: new Cell(0,0, '2'),
        B2: new Cell(0,0, '5'),
      });
      expect(cell.value).to.equal(7);
    });

    it('should calculate value as zero if cell is empty', () => {
      cell = new Cell(0, 0, '   ');
      cell.compute({});
      expect(cell.value).to.equal(0);
    });
  });

})
