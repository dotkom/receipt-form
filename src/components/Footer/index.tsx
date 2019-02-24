import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.footer`
  background: #f2f2f2;
  padding: 4rem 2.5rem;
  text-align: center;
`;

export const Footer = () => {
  return (
    <FooterStyle>
      Fra Dotkom med kjærlighet {"<3"}
    </FooterStyle>
  );
};
