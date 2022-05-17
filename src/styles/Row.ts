import styled from 'styled-components';

const Row = styled.div<{ width?: string, gap?: string }>`
  width: ${({ width }) => width || ''};
  gap: ${({ gap }) => gap || ''};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default Row;
