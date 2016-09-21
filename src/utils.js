/* @flow */

/**
 * Given a numerical integer return the coresponding letter
 * e.g. 0 = A, 1 = B, 2 = C ... 26 = AA, 27 = AB etc
 *
 * @export
 * @param {number} val
 * @returns {string}
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

/**
 * Return true if a valid basic arithmetic operator: +, -, *, /
 *
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export function isOperator(str: string) {
  return str === '+' || str === '-' || str === '*' || str === '/';
}

export const operatorMap = {
  '+': (o1: number, o2: number) => o1 + o2,
  '-': (o1: number, o2: number) => o1 - o2,
  '*': (o1: number, o2: number) => o1 * o2,
  '/': (o1: number, o2: number) => o1 / o2,
}
