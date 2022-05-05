function reduceDeep(arr, fn) {
  if (!Array.isArray(arr)) return arr;
  return arr.reduce((a, b) => fn(reduceDeep(a, fn), reduceDeep(b, fn)), 0);
}

const sumArray = (array) => reduceDeep(array, (a, b) => a + b);

function map2DimArr(array: number[][], fn: Function) {
  return array.map((curr, i) => curr.map((elem, j) => fn(elem, i, j, array)));
}

// const maskArray = (a, b) =>
//   a.map((var1, index) => (var1 === b[index] ? 0 : var1));

// const maskArrayDeep = (a, b) =>
//   a.map((value, index) =>
//     Array.isArray(value[0])
//       ? maskArrayDeep(value, b[index])
//       : maskArray(value, b[index])
//   );

const maskArray = (a, b) => {
  const flatArr2 = b.flat();
  return a.flat().map((val, i) => (flatArr2[i] === val ? 0 : val));
};

export { sumArray, map2DimArr, maskArray };
