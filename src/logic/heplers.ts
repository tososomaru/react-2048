import { rotateMatrixClockwise } from './rotateMatrix';
import { Field } from './types';

/**
 * Возвращает true, если массив имеет дупликаты
 * @param array
 */
const hasDuplicates = <T>(array: Array<T>): boolean => new Set(array).size !== array.length;

/**
 * Упаковывает по индексно элементы двух массивов
 * @example
 * [1, 2, 3], [9, 8, 7] -> [[1, 9], [2, 8], [3, 7]]
 * @param l - Левый массив
 * @param r - Правый массив
 */
const zip = (l: number[], r: number[]): number[][] => l.map((val, i) => [val, r[i]]);

/**
 * Возвращает массив с парами соседних чисел из массива
 * @example
 * [1, 2, 3, 4] -> [[1, 2], [2, 3], [3, 4]]
 * @param arr
 */
const pair = (arr: number[]): number[][] => zip(arr.slice(0, -1), arr.slice(1));

/**
 * Возвращает true, если на поле нет пустых ячекк
 */
function isFull(arr: Field): boolean {
  return arr.flat().includes(0) === false;
}

/**
 * Возвращает true, если на поле есть элемент равный 2048
 */
function isWin(arr: Field): boolean {
  return arr.flat().includes(2048) === true;
}

/**
 * Возвращает true, если на поле существует возможный ход по горизонтали
 * @param array
 */
function canBeMoveArr(array: Field) {
  function canBeMoveRow(row: number[]): boolean {
    return pair(row).some(
      (value: number[]) => hasDuplicates(value) || row.includes(0),
    );
  }
  return array.some((row) => canBeMoveRow(row));
}

/**
 * Возвращает true, если на поле существуют возможные ходы
 * @param array
 */
const canBeMove = (array: Field): boolean => (
  canBeMoveArr(array) || canBeMoveArr(rotateMatrixClockwise(array)));

const getExponent = (value: number): number => Math.floor(Math.log10(Math.abs(value + 1)));

export {
  isFull, isWin, canBeMove, getExponent,
};
