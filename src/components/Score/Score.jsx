import React from 'react';
import styled from 'styled-components';
import Addition from '../Addition/Addition';

const StyledScore = styled.p`
  font-weight: bold;
  font-size: 48px;

  @media (max-width: 480px) {
    font-size: 8vw;
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

const Score = ({ text, score, children }) => (
  <Content>
    <StyledText>{text}</StyledText>
    {children}
    <StyledScore>{score}</StyledScore>
  </Content>
);

export default Score;
