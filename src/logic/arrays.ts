import { Tree } from './types';

/**
 * Глубокий reduce
 * @param arr Массив
 * @param fn Функция
 */
function reduceDeep<T extends Array<T>>(arr: Tree<T>, fn: CallableFunction): any | never {
  if (!Array.isArray(arr)) return arr;
  return arr.reduce((a, b) => fn(reduceDeep(a, fn), reduceDeep(b, fn)), 0);
}

/**
 * Возвращает сумму элементов массива
 * @param array Массив
 */
const sumArray = <T extends Array<T>>(array: Tree<T>): number => (
  reduceDeep(array, (a: number, b: number) => a + b));

/**
 * Возвращает произведение элементов массива
 * @param array Массив
 */
const mulArray = <T extends Array<T>>(array: Tree<T>): number => (
  reduceDeep(array, (a: number, b: number) => a * b));

function reshapeDeep<T extends Array<T>>(array: Tree<T>, size: number[]): Tree<T> {
  const x = size.shift();
  const { length } = array;
  const reshaped = [...Array(length / x).keys()]
    .map((value) => array.slice(value * x, value * x + x));
  return size.length ? reshapeDeep(reshaped, size) : reshaped;
}

/**
 * Возвращает массив новой формы
 * @param array
 * @param size
 */
function reshape<T extends Array<T>>(array: Tree<T>, size: number[]): Tree<T> {
  // TODO: проверка размерности
  // TODO: разворачивание массива
  return reshapeDeep<T>(array, size)[0];
}

function createArray<T>(size: number[], fill: T): Tree<T> {
  return reshape(Array.from(Array(size.reduce((a, b) => a * b)))
    .fill(fill), size);
}

function shapeDeep<T extends Array<T>>(array: Tree<T>): number[] {
  return array.map((val) => (!Array.isArray(val) ? [] : (val.every(Array.isArray) ? shapeDeep(val).flat() : array.length)));
}

function shape<T extends Array<T>>(array: Tree<T>): number[] | never {
  if (!Array.isArray(array)) throw new Error();
  if (!array.every(Array.isArray)) return [array.length];
  return shapeDeep(array);
}

export {
  sumArray, mulArray, reshape, createArray, shape,
};
