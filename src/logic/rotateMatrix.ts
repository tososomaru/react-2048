import { compose, composeNTimes } from './compose';

/**
 * Производит реверс двумерной матрицы
 */
function reverseMatrix(matrix: number[][]) {
  return matrix.reduceRight((acc, row) => [...acc, row], []);
}

/**
 * Транспонирует двумерную матрицу
 */
function transposeMatrix(matrix: number[][]): number[][] {
  return matrix.reduce(
    (acc, row) => row.map((item, i) => (acc[i] || <number[]>[]).concat(row[i])),
    [],
  );
}

/**
 * Поворачивает матрицу по часовой стрелке
 */
function rotateMatrixClockwise(matrix: number[][], count = 1) {
  function rotateClockwiseOnce(array: number[][]) {
    return compose(transposeMatrix, reverseMatrix)(array);
  }
  return composeNTimes(rotateClockwiseOnce, matrix, count);
}

export { rotateMatrixClockwise };
