import React from 'react';
import styled from 'styled-components';
import Cell from './Cell/Cell';

const StyledGrid = styled.div`
  background: #bbada0;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  gap: 15px;
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 5px;

  @media (max-width: 480px) {
    gap: 3vw;
    padding: 3vw;
    border-radius: 1vw;
  }
`;

const Grid = ({ numbers, additionalNumber }) => (
  <StyledGrid>
    {numbers.map((row, indexRow) =>
      row.map((number, indexNumber) => (
        <Cell
          key={indexRow * 4 + indexNumber}
          number={number}
          additional={
            indexRow === additionalNumber.row - 1 &&
            indexNumber === additionalNumber.col - 1
          }
        />
      ))
    )}
  </StyledGrid>
);

export default Grid;
