/* @flow */

/**
 * Given a numerical integer return the coresponding letter
 * e.g. 0 = A, 1 = B, 2 = C ... 26 = AA, 27 = AB etc
 *
 * @export
 * @param {number} val
 */
export function numberToLetter(val: number) {
  let numberToConvert = val;
  const codeA = 'A'.charCodeAt(0);
  const codeZ = 'Z'.charCodeAt(0);
  const length = codeZ - codeA + 1;

  let letter = "";
  while (numberToConvert >= 0) {
    letter = String.fromCharCode(numberToConvert % length + codeA) + letter;
    numberToConvert = Math.floor(numberToConvert / length) - 1;
  }
  return letter;
}
