import React from 'react';
import styled from 'styled-components';

import Text from '../Styles/Text';
import Link from '../Styles/Link';
import Row from '../Styles/Row';

const StyledFooter = styled.div`
  margin-top: 10px;
`;

const Footer = () => (
  <StyledFooter>
    <Row>
      <Text fontSize="30px">Code by&nbsp;&nbsp;&nbsp;</Text>
      <Link href="https://t.me/tososomaru" target="_blank">
        @tososomaru
      </Link>
    </Row>
    <Row>
      <Text fontSize="30px">Design by&nbsp;&nbsp;&nbsp;</Text>
      <Link href="https://t.me/fadesyphe" target="_blank">
        @fadesyphe
      </Link>
    </Row>
  </StyledFooter>
);

export default Footer;
