// import React from 'react';
import styled from 'styled-components';

import { BaseInputStyle } from './Base';

import { colors } from 'constants/colors';

export const Select = styled.select`
  border: 2px solid ${colors.darkGray};
  background: ${colors.white};
  ${BaseInputStyle}
`;
