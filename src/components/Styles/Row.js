import styled from 'styled-components';

const Row = styled.div`
  width: ${({ width }) => width || ''};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default Row;
