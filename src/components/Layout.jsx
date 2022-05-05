import React from 'react';
import styled from 'styled-components';
import Column from '../Styles/Column';

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const Content = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = ({ children }) => (
  <StyledLayout>
    {/* <Column minHeight="500px" width="500px" height="">
      {children}
    </Column> */}
    <Content>{children}</Content>
  </StyledLayout>
);

export default Layout;
