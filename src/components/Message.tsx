import React, { FC } from 'react';
import styled from 'styled-components';
import Title from '../styles/Title';
import Button from './Button';

const StyledMessage = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -100%;
  aspect-ratio: 1;
  background: rgba(238, 228, 218, 0.6);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
  z-index: 100;
`;

export interface IMessage {
  trigger: boolean,
  title: string,
  button: string,
  callback: React.MouseEventHandler<HTMLButtonElement>
}

const Message: FC<IMessage> = ({
  trigger, title, button, callback,
}) => {
  if (trigger) {
    return (
      <StyledMessage>
        <Title fontSize="50px" fontWeight={600}>
          {title}
        </Title>
        <Button onClick={callback}>{button}</Button>
      </StyledMessage>
    );
  }
  return null;
};

export default Message;
