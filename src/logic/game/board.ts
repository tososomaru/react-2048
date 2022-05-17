import { createArray, sumArray } from '../arrays';
import { canBeMove, isFull, isWin } from '../heplers';
import generateRandomInt from '../random';
import { CellType, Field } from '../types';
import { pipe } from '../compose';
import Cell from '../../components/Cell/Cell';

export type SizeBoard = {
  height : number,
  width : number,
};

function fieldToArray(field: CellType[][]): Field {
  const array = createArray([field.length, field.length], null);

  field.flat()
    .forEach((val) => {
      array[val.x][val.y] = val.value;
    });

  return array;
}

function deepMap(field: CellType[][], callback: CallableFunction) {
  return field.map((row) => row.map(callback));
}

/**
 * Транспонирует поле
 * @private
 */
function transpose(field: CellType[][]) {
  return deepMap(field, (cell: CellType) => ({ ...cell, x: cell.y, y: cell.x }));
}

/**
 * Реверс поля по вертикали
 * @private
 */
function flipY(field: CellType[][]) {
  return deepMap(field, (cell: CellType) => ({ ...cell, y: field.length - cell.y - 1 }));
}

/**
 * Реверс поля по гризонтали
 * @private
 */
function flipX(field: CellType[][]) {
  return deepMap(field, (cell: CellType) => ({ ...cell, x: field.length - cell.x - 1 }));
}

/**
 * Возвращает сумму очков, полученных за ход
 */
function additionalScore(field: CellType[][]): number {
  return sumArray(field.flat()
    .filter((cell) => cell.merged)
    .map((cell) => cell.value));
}

/**
 * Перемещает влево и объединяет ячейки
 */
function move(field: CellType[][]): CellType[][] {
  const array = createArray([field.length, field.length], null);

  field.forEach((row, rowIndex) => row.forEach((val, cellIndex) => {
    array[val.x][val.y] = [val, rowIndex, cellIndex];
  }));

  array.map((row: [CellType[], number, number]) => row.map(([cell]) => {
    const resetedCell = resetCell(cell);
    if (resetedCell.value === 0) return resetedCell;

    const zero = findZeroInRow(field, resetedCell.x);
    if (zero && zero.y < resetedCell.y) {
      const { x, y } = resetedCell;
      [resetedCell.x, resetedCell.y] = [zero.x, zero.y];
      zero.x = x;
      zero.y = y;
    }
    return merge(field, resetedCell);
  }));

  array.forEach((row: [CellType[], number, number]) => row.forEach(([val, i, j]) => {
    field[i][j] = val;
  }));

  return field;
}

/**
 * Поиск ячейки по координатам
 * @param field игровое поле
 * @param x
 * @param y
 */
function findByCoord(field: CellType[][], x: number, y: number): CellType {
  return field.flat().find((cell) => !!compareCoordinates(cell, x, y));
}

/**
 * Возвращает ячейкку, если переданные координаты равны координатам ячейки
 * @param cell
 * @param x
 * @param y
 */
function compareCoordinates(cell: CellType, x: number, y: number): CellType | null {
  return (cell.x === x && cell.y === y) ? cell : null;
}

const resetCell = (cell: CellType): CellType => {
  cell.merged = false;
  cell.added = false;
  return cell;
};

/**
 * Поиск нулевой ячейки в строке
 * @param field
 * @param x
 * @param y
 */
function findZeroInRow(field: CellType[][], x = 0, y = 0): CellType | null {
  if (y === field.length + 1) return null;
  const finded = findByCoord(field, x, y);
  return finded?.value === 0
    ? finded : findZeroInRow(field, x, y + 1);
}

/**
 * Сортирует поле по координатам
 * @param field
 */
function sortField(field: CellType[][]) : CellType[][] {
  const array = createArray([field.length, field.length], null);

  field.flat().forEach((cell) => { array[cell.x][cell.y] = cell; });

  return array;
}

/**
 * Возвращает не нулевые клетки
 * @private
 */
function getFreeCells(field: CellType[][]): CellType[] {
  return field.flat().filter((cell) => cell.value === 0);
}

const left = (field: CellType[][]) => move(field);

const right = (field: CellType[][]): CellType[][] => pipe(flipY, move, flipY)(field);

const up = (field: CellType[][]): CellType[][] => pipe(transpose, move, transpose)(field);

const down = (field: CellType[][]): CellType[][] => pipe(flipX, up, flipX)(field);

const moveDispatcher = {
  down,
  left,
  right,
  up,
};

/**
 * Объединяет ячейку с левой ячейкой
 * @param field
 * @param cell
 */
function merge(field: CellType[][], cell: CellType) {
  if (cell.value === 0) return cell;
  const finded = findByCoord(field, cell.x, cell.y - 1);
  if (cell.y === 0 || !finded || finded.value !== cell.value) {
    return cell;
  }

  // this.moved = true;

  finded.value *= 2;
  finded.merged = true;
  cell.value = 0;
  return cell;
}

function compareFields(left: number[][], right: number[][]) {
  const rightFlat = right.flat();
  return left.flat().every((value, index) => value === rightFlat[index]);
}

/**
 * Вовзращает игровое поле с добавленным числом 2 (90%) или 4(10%) в свободную клетку
 */
function addNumberToField(field: CellType[][]): CellType[][] {
  if (isFull(fieldToArray(field))) return field;

  const freeCells = getFreeCells(field);
  const randomFreeCellIndex = generateRandomInt(freeCells.length);
  const randomCellI = freeCells[randomFreeCellIndex].x;
  const randomCellJ = freeCells[randomFreeCellIndex].y;

  const num2or4 = generateRandomInt(100) < 90 ? 2 : 4;

  const randomCell = findByCoord(field, randomCellI, randomCellJ);
  randomCell.value = num2or4;
  randomCell.added = true;
  randomCell.x = randomCellI;
  randomCell.y = randomCellJ;
  return field;
}

const identity = <T>(x: T) => ({ ...x });

function copyField(field: CellType[][]): CellType[][] {
  return field.map((row) => row.map(identity));
}

function play({
  field, direction, isNewGame, size = 4,
}: { direction?: string, isNewGame?: boolean, size?: number, field?: CellType[][] }) {
  if (isNewGame) {
    return {
      cells: pipe(init, addNumberToField, addNumberToField)(size),
      additional: 0,
      win: false,
      defeat: false,
      size,
    };
  }

  const movedField = moveDispatcher[direction](copyField(field));
  const moved = !compareFields(fieldToArray(movedField), fieldToArray(field));

  const newField = moved ? addNumberToField(movedField) : movedField;

  return {
    cells: newField,
    additional: additionalScore(movedField),
    win: isWin(fieldToArray(newField)),
    defeat: !canBeMove(fieldToArray(newField)),
    size,
  };
}

/**
 * Инициализирует новое поле
 */
function init(size: number) {
  return Array.from(Array(size), () => new Array(size)
    .fill(null))
    .map((row, x) => row.map((col, y) => (
      {
        value: 0, x, y, merged: false, added: false,
      }
    )));
}

/**
 * Создает моковое поле для тестов
 */
function mock(field: CellType[][]) {
  field[0][0].value = 4;
  field[0][1].value = 2;
  field[1][0].value = 1024;
  field[3][0].value = 2048;
  field[2][2].value = 16;
  field[2][2].value = 128;
  return field;
}

export {
  play, mock,
};
