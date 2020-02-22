import React from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

import logo from './online-logo.png';

const HeaderStyle = styled.header`
  background-color: ${colors.primary};
  display: grid;
  justify-content: center;
  box-sizing: border-box;
`;

const Text = styled.h2`
  color: ${colors.white};
  text-align: center;
  letter-spacing: 2px;
`;

const Image = styled.img`
  width: 26rem;
  max-width: 100vw;
  box-sizing: border-box;
  padding: 1.5rem;
`;

export const Header = () => {
  return (
    <HeaderStyle>
      <Image src={logo} alt="Linjeforeningen Online" />
      <Text>Kvitteringsskjema</Text>
    </HeaderStyle>
  );
};
