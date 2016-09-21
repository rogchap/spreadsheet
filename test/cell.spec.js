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
  })

  describe('#content', () => {

    it('should be all uppercase', () => {
      expect(cell.content).to.equal('BLAH');
    });

  })

})
