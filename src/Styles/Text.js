import styled from 'styled-components';

const Text = styled.p`
  font-weight: ${({ fontWeight }) => fontWeight || 300};
  font-size: ${({ fontSize }) => fontSize || '15px'};

  @media (max-width: 480px) {
    font-size: 5vw;
  }
`;

export default Text;
