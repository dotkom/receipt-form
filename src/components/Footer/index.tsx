import React from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

const FooterStyle = styled.footer`
  background: ${colors.backgroundGray};
  padding: 4rem 2.5rem;
  text-align: center;
`;

export const Footer = () => {
  return <FooterStyle>Fra Dotkom med kjærlighet {'<3'}</FooterStyle>;
};
