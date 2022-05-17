export type Tree<T> = T | Array<Tree<T>>;
export type Array2D<T> = Array<Array<T>>;
export type Field = Array2D<number>;
export type CellType = {
  value: number,
  x: number,
  y: number,
  added: boolean,
  merged: boolean
};
