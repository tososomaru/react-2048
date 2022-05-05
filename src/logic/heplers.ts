import { rotateMatrixClockwise } from './rotateMatrix';

/**
 * Проверяет, есть среди массива элемент равный нулю
 */
function isFull(arr: number[][]): boolean {
  return arr.flat().includes(0) === false;
}

/**
 * Проверяет, есть среди массива элемент равный 2048
 */
function isWin(arr: number[][]): boolean {
  return arr.flat().includes(2048) === true;
}

const canBeMove = (array) =>
  canBeMoveArr(array) || canBeMoveArr(rotateMatrixClockwise(array));

function canBeMoveArr(array) {
  function canBeMoveRow(array) {
    return pair(array).some(
      (value) => hasDuplicates(value) || array.includes(0)
    );
  }
  return array.some((row) => canBeMoveRow(row));
}

const hasDuplicates = (array) => new Set(array).size !== array.length;
const pair = (arr) => zip(arr.slice(0, -1), arr.slice(1));
const zip = (l, r) => l.map((val, i) => [val, r[i]]);

export { isFull, isWin, canBeMove };
