// import React from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

import { BaseInputStyle } from './Base';
import { getValidationLevelColor, IValidationMessageProps } from './ValidationMessages';

export const Select = styled.select<IValidationMessageProps>`
  border: 2px solid ${colors.darkGray};
  background: ${colors.white};
  ${BaseInputStyle}

  ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}

  ${({ highlight }) => highlight && `border-color: ${colors.primary};`}

  :focus {
    ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}
  }
`;
