import styled from 'styled-components';

const Column = styled.div < { width?: string, height?: string, minHeight? : string } >`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight || ''};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export default Column;
