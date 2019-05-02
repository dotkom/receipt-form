import React from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

const LOGIN_TEXT = `
  For å automatisk fylle hente inn navn og e-post kan du logge inn via Onlineweb.
  Denne informasjonen vil bare fylle ut feltene, og kan overskrives i etterkant.
`;

const TextStyle = styled.p`
  font-weight: 600;
  color: ${colors.darkGray};
  max-width: 32rem;
  font-size: 20px;
`;

export const LoginText = () => {
  return <TextStyle>{LOGIN_TEXT}</TextStyle>;
};
