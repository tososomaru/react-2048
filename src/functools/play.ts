import generateRandomInt from './random';
import { map2DimArr, sumArray, maskArray } from './arrays';
import moveField from './moveCells';
import { composeNTimes } from './compose';
import { isWin, isFull, canBeMove } from './heplers';

const blankField = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function addNumberToField(playField: number[][]) {
  function getFreeCells(field: number[][]) {
    return map2DimArr(field, (elem, i, j) => [i, j, elem])
      .flat()
      .filter((val) => val[2] === 0);
  }

  if (isFull(playField)) return playField;

  const freeCells = getFreeCells(playField);
  const randomFreeCellIndex = generateRandomInt(freeCells.length);
  const randomCellI = freeCells[randomFreeCellIndex][0];
  const randomCellJ = freeCells[randomFreeCellIndex][1];
  const num2or4 = generateRandomInt(100) < 90 ? 2 : 4;

  const result = map2DimArr(playField, (elem, i, j) =>
    i === randomCellI && j === randomCellJ ? num2or4 : elem
  );

  return result;
}

function play({ prevField, direction, isNewGame }) {
  if (isNewGame) {
    return {
      prevField: blankField,
      nextField: composeNTimes(addNumberToField, 2, blankField),
    };
  }

  const movedField = moveField(prevField, direction);
  const additional = sumArray(maskArray(movedField, prevField));
  const nextField = addNumberToField(movedField);
  const victory = isWin(nextField);
  const defeat = !canBeMove(nextField);

  return {
    prevField,
    nextField,
    victory,
    defeat,
    additional,
  };
}

export default play;
