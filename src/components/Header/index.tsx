import React from 'react';
import styled from 'styled-components';

import logo from './online-logo.png';

const HeaderStyle = styled.div`
  background-color: #0060a3;
  display: grid;
  justify-content: center;
  box-sizing: border-box;
`;

const Text = styled.h2`
  color: #fff;
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
      <Image src={logo} />
      <Text>Kvitteringsskjema</Text>
    </HeaderStyle>
  );
};
