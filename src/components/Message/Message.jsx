import React from 'react';
import styled from 'styled-components';
import Title from '../Styles/Title';
import Button from '../Button/Button';

const StyledView = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -100%;
  background: rgba(238, 228, 218, 0.6);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
`;

const Message = ({ trigger, title, button, callback }) => {
  if (trigger) {
    return (
      <StyledView>
        <Title fontSize="50px" fontWeight="600">
          {title}
        </Title>
        <Button onClick={callback}>{button}</Button>
      </StyledView>
    );
  }
  return null;
};

export default Message;
