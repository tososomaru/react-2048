import React, { FC } from 'react';
import './Cell.css';
import styled, { css, keyframes } from 'styled-components';
import { CellType } from '../../logic/types';
import { useData } from '../../context';

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(3px, 0, 0);
  }
`;

const show = keyframes`
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`;

const showRule = css`
  ${show} 200ms ease-in
`;

const shakeRule = css`
  ${shake} 200ms ease-in
`;

// TODO: добавить динамический цвет и размер
const StyledCell = styled.div`
  aspect-ratio: 1;
  grid-column: ${(props) => props.x + 1};
  grid-row: ${(props) => props.y + 1};
  animation: ${(props) => ((props.show && props.added && showRule) || (props.shake && props.merged && shakeRule))};
`;

export interface ICell {
  cell: CellType
}

const Cell: FC<ICell> = ({ cell }) => {
  const { data } = useData();
  return (
    <StyledCell
      x={cell.y}
      y={cell.x}
      value={cell.value}
      merged={cell.merged}
      added={cell.added}
      shake={data.shake}
      show={data.show}
      className={`cell cell-${cell.value}`}
    >
      {cell.value}
    </StyledCell>
  );
};

export default Cell;
