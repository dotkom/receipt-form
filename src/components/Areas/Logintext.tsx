import React from 'react';
import styled from 'styled-components';

const LOGIN_TEXT = `
  For å automatisk fylle inn informasjon som navn, signatur og e-post kan du logge inn via Onlineweb.
  Denne informasjonen vil bare fylle ut feltene, og kan overskrives i etterkant
`;

const TextStyle = styled.p`
  font-weight: 600;
  color: #8e8e8e;
  max-width: 32rem;
  font-size: 20px;
`;

export const LoginText = () => {
  return <TextStyle>{LOGIN_TEXT}</TextStyle>;
};
