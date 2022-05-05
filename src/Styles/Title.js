import styled from 'styled-components';

const Title = styled.p`
  font-weight: ${({ fontWeight }) => fontWeight || 1200};
  font-size: ${({ fontSize }) => fontSize || '90px'};

  @media (max-width: 480px) {
    font-size: 10vw;
  }
`;

export default Title;
