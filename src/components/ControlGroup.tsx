import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StyledControlGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledGrid = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  aspect-ratio: 1;
`;

const ControlGroup = ({
  show, onLeft, onRight, onUp, onDown,
}) => (show
  && (
  <StyledControlGroup>
    <StyledGrid>
      <IconButton aria-label="left" onClick={onLeft} sx={{ gridColumn: 1, gridRow: 2 }}>
        <KeyboardArrowLeftIcon fontSize="large" />
      </IconButton>
      <IconButton aria-label="up" onClick={onUp} sx={{ gridColumn: 2, gridRow: 1 }}>
        <KeyboardArrowUpIcon fontSize="large" />
      </IconButton>
      <IconButton aria-label="right" onClick={onRight} sx={{ gridColumn: 3, gridRow: 2 }}>
        <KeyboardArrowRightIcon fontSize="large" />
      </IconButton>
      <IconButton aria-label="down" onClick={onDown} sx={{ gridColumn: 2, gridRow: 3 }}>
        <KeyboardArrowDownIcon fontSize="large" />
      </IconButton>
    </StyledGrid>

  </StyledControlGroup>
  )
);

export default ControlGroup;
