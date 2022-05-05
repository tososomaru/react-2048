import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-weight: 700;
  font-size: 24px;
  color: #f9f6f2;
  background: #8f7a66;
  border-radius: 3px;
  text-align: center;
  outline: none;
  border: none;
  text-align: center;
  padding: 10px 10px;

  @media (max-width: 480px) {
    font-size: 5vw;
  }
`;

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

export default Button;
