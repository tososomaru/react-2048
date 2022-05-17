import React, { FC } from 'react';
import styled from 'styled-components';
import Cell from './Cell/Cell';
import { CellType } from '../logic/types';
import { useBodyScrollLock } from '../hooks';

const StyledGrid = styled.div<{ width: number, height: number }>`
  background: #bbada0;
  display: grid;
  grid-template: repeat(${(props) => props.width}, 1fr) / repeat(${(props) => props.height}, 1fr);
  gap: 15px;
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  justify-items: center;
  @media (max-width: 480px) {
    gap: 3vw;
    padding: 3vw;
    border-radius: 1vw;
  }
`;

export interface IGrid {
  cells: CellType[][],
  size: number,
  handlers: unknown,
}

const GameBoard: FC<IGrid> = ({
  cells, size, handlers,
}) =>
  // useBodyScrollLock();
  (
    <StyledGrid {...handlers} width={size} height={size}>
      {cells.flat()
        .map((cell, index) => <Cell key={index} cell={cell} />)}
    </StyledGrid>
  );
export default GameBoard;
