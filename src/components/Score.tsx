import React, { FC } from 'react';
import styled from 'styled-components';
import { getExponent } from '../logic/heplers';

const StyledScore = styled.p`
  font-weight: bold;
  font-size: ${(props) => `${40 - (2 * getExponent(props.value))}px` || '40px'};

  @media (max-width: 480px) {
    font-size: ${(props) => `${8 - (0.2 * getExponent(props.value))}vw` || '8vw'};
  }
`;

const Content = styled.div`
  margin: 0 5px;
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  align-items: center;
`;

const StyledText = styled.p`
  font-weight: 400;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 3vw;
  }
`;

export interface IScore {
  text: string,
  score: number,
  children?: React.ReactNode
}

const Score: FC<IScore> = ({ text, score, children }) => (
  <Content>
    <StyledText>{text}</StyledText>
    {children}
    <StyledScore value={score}>{score}</StyledScore>
  </Content>
);

export default Score;
