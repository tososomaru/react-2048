import styled from 'styled-components';

const Column = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  min-height: ${({ minHeight }) => minHeight || ''};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    /* max-width: 90vw; */
    width: 90vw;
    max-height: 90vw;
  }
`;

export default Column;
