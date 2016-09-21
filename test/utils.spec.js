import { expect } from 'chai';
import * as utils from '../src/utils';

describe('Utils', () => {

  describe('#numberToLetter', () => {

    it('returns a string', () => {
      const rtn = utils.numberToLetter(1);
      expect(rtn).to.be.a('string');
    })

    it('returns the correct letter', () => {
      expect(utils.numberToLetter(1)).to.equal('A');
      expect(utils.numberToLetter(2)).to.equal('B');
      expect(utils.numberToLetter(27)).to.equal('AA');
      expect(utils.numberToLetter(28)).to.equal('AB');
    })

  });

});
