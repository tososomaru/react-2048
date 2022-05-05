import { compose, composeNTimes } from './compose';

/**
 * Производит реверс двумерной матрицы
 */
function reverseMatrix(matrix: number[][]) {
  return matrix.reduceRight((acc, row) => [...acc, row], []);
}

/**
 * Производит реверс двумерной матрицы
 */
function transposeMatrix(matrix: number[][]): number[][] {
  return matrix.reduce(
    (acc, row) => row.map((item, i) => (acc[i] || []).concat(row[i])),
    []
  );
}

/**
 * Поворачивает матрицу на @count раз по часовой стрелке
 */
function rotateMatrixClockwise(matrix: number[][], count = 1) {
  function rotateClockwiseOnce(array: number[][]) {
    return compose(transposeMatrix, reverseMatrix)(array);
  }
  return composeNTimes(rotateClockwiseOnce, count, matrix);
}

/**
 * Поворачивает матрицу на @count раз против часовой стрелки
 */
function rotateMatrixCounter(matrix: number[][], count = 1) {
  function rotateCounterClockwiseOnce(array: number[][]) {
    return compose(reverseMatrix, transposeMatrix)(array);
  }
  return composeNTimes(rotateCounterClockwiseOnce, count, matrix);
}

export { rotateMatrixClockwise, rotateMatrixCounter };
