import styled from 'styled-components';

const Text = styled.p`
  font-weight: 300;
  font-size: 20px;

  @media (max-width: 480px) {
    font-size: 5vw;
  }
`;

export default Text;
