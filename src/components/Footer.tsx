import React, { FC } from 'react';
import styled from 'styled-components';

import Text from '../styles/Text';
import Link from '../styles/Link';
import Row from '../styles/Row';

const StyledFooter = styled.div`
  margin-top: 10px;
`;

const Footer: FC = () => (
  <StyledFooter>
    <Row>
      <Text fontSize="30px">Code&nbsp;&nbsp;&nbsp;</Text>
      <Link href="https://t.me/tososomaru" target="_blank">
        @tososomaru
      </Link>
    </Row>
    <Row>
      <Text fontSize="30px">Design&nbsp;&nbsp;&nbsp;</Text>
      <Link href="https://t.me/fadesyphe" target="_blank">
        @fadesyphe
      </Link>
    </Row>
  </StyledFooter>
);

export default Footer;
