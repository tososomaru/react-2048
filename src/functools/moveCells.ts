import { rotateMatrixClockwise, rotateMatrixCounter } from './rotateMatrix';
// const DIRECTIONS = {
//   UP: 'UP',
//   LEFT: 'LEFT',
//   RIGHT: 'RIGHT',
//   DOWN: 'DOWN',
// };

const directions = {
  left: 0,
  down: 1,
  right: 2,
  up: 3,
};

/**
 * Не рекурсивно объедияет равные элементы массива слева на право
 * [2, 2, 2, 2] -> [4, 4]
 */
function merge(l: number[], r: number[] = []): number[] {
  if (l.length === 0) return r;
  if (l.length === 1) return merge(l.slice(1), [...r, l[0]]);
  return l[0] === l[1]
    ? merge(l.slice(2), [...r, l[0] * 2])
    : merge(l.slice(1), [...r, l[0]]);
}

function filterZero(row: number[]): number[] {
  return row.filter((value) => value !== 0);
}

function moveLeftInRow(row: number[]): number[] {
  function fillArr(arr: number[], length: number): number[] {
    return arr.concat(Array(length - arr.length).fill(0));
  }
  return fillArr(merge(filterZero(row)), row.length);
}

function moveField(field: number[][], direction: string) {
  const rotatedField = rotateMatrixClockwise(field, directions[direction]);
  const movedField = rotatedField.map(moveLeftInRow);
  return rotateMatrixCounter(movedField, directions[direction]);
}

export default moveField;
