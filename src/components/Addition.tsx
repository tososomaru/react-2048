import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translateY(-20px);
    }
`;

const StyledAddition = styled.div`
  position: absolute;
  animation: ${move} 600ms ease-in;
  animation-fill-mode: both;
  font-size: 25px;
  width: 100%;
  text-align: center;
`;

export interface IAddition {
  children: React.ReactNode
}

const Addition: FC<IAddition> = ({ children }) => <StyledAddition>{children}</StyledAddition>;
export default Addition;
