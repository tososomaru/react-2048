import styled from 'styled-components';

const Title = styled.p<{ fontWeight?: number, fontSize?: string, mt?: string }>`
  font-weight: ${({ fontWeight }) => fontWeight || 1200};
  font-size: ${({ fontSize }) => fontSize || '90px'};
  margin-top: ${({ mt }) => mt || ''};

  @media (max-width: 480px) {
    font-size: 10vw;
  }
`;

export default Title;
