import React from 'react';
import styled from 'styled-components';

const StyledPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  width: 100%;
  align-items: center;
`;

const ControlPanel = ({ children }) => <StyledPanel>{children}</StyledPanel>;

export default ControlPanel;
